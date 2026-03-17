import { useEffect, useMemo, useState } from 'react'
import { Plus, Edit2, Trash2, UploadCloud, X } from 'lucide-react'
import Card from '../components/Card'
import {
  createNews,
  fetchAdminNews,
  removeNews,
  updateNews,
  uploadNewsImage,
} from '../services/newsService'
import type { NewsDto, NewsInput } from '../types'

const CATEGORY_OPTIONS = ['General', 'Operations', 'Announcements', 'Other']

const formatDate = (value: string | undefined) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsDto[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<NewsInput>({
    title: '',
    summary: '',
    content: '',
    category: CATEGORY_OPTIONS[0],
    publishedAt: new Date().toISOString().slice(0, 10),
    activeStatus: true,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sortedNews = useMemo(() => {
    return [...newsList].sort((a, b) => {
      const aTime = new Date(a.publishedAt).getTime()
      const bTime = new Date(b.publishedAt).getTime()
      return bTime - aTime
    })
  }, [newsList])

  const loadNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAdminNews()
      setNewsList(data)
    } catch (err) {
      setError('Unable to load news. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  const resetForm = () => {
    setForm({
      title: '',
      summary: '',
      content: '',
      category: CATEGORY_OPTIONS[0],
      publishedAt: new Date().toISOString().slice(0, 10),
      activeStatus: true,
    })
    setImageFile(null)
    setIsEditing(false)
    setEditingId(null)
    setError(null)
  }

  const handleInputChange = (field: keyof NewsInput, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (file: File | null) => {
    setImageFile(file)
  }

  const uploadImageIfNeeded = async (): Promise<string | undefined> => {
    if (!imageFile) return form.imageUrl

    // Validate file on client side first
    if (!imageFile.type.startsWith('image/')) {
      throw new Error('Please select a valid image file (JPEG, PNG, GIF, or WebP).')
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      throw new Error('Image file is too large. Maximum size is 5MB.')
    }

    try {
      const uploadedUrl = await uploadNewsImage(imageFile)
      return uploadedUrl
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message
      throw new Error(backendMessage || 'Failed to upload image.')
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    try {
      const imageUrl = await uploadImageIfNeeded()
      const payload: NewsInput = {
        ...form,
        imageUrl: imageUrl ?? form.imageUrl,
      }

      if (isEditing && editingId) {
        await updateNews(editingId, payload)
      } else {
        await createNews(payload)
      }

      await loadNews()
      resetForm()
    } catch (err: any) {
      const backendData = err?.response?.data
      const backendMessage = backendData?.message
      const details = backendData?.details
      const detailText = Array.isArray(details)
        ? details.map((d: any) => `${d.path.join('.')}: ${d.message}`).join('; ')
        : ''

      const message =
        backendMessage ||
        (detailText ? `Validation issues: ${detailText}` : '') ||
        err?.message ||
        'Please check the form and try again.'

      setError(`Failed to save news: ${message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const startEditing = (item: NewsDto) => {
    setEditingId(item.id ?? item._id ?? null)
    setIsEditing(true)

    setForm({
      title: item.title,
      summary: item.summary ?? '',
      content: item.content,
      category: item.category,
      publishedAt: formatDate(item.publishedAt),
      activeStatus: item.activeStatus ?? true,
      imageUrl: item.imageUrl,
    })
    setImageFile(null)
    setError(null)
  }

  const handleDelete = async (item: NewsDto) => {
    const id = item.id ?? item._id
    if (!id) return

    const confirmed = window.confirm('Delete this news item? This action cannot be undone.')
    if (!confirmed) return

    setSubmitting(true)
    setError(null)
    try {
      await removeNews(id)
      await loadNews()
    } catch (err) {
      setError('Failed to delete the news item. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6">
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-secondary">News Management</h1>
            <p className="text-sm text-secondary/70 mt-1">
              Create, edit, and publish news updates for the portal.
            </p>
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary hover:bg-surface-muted"
            >
              <X className="h-4 w-4" />
              Cancel Edit
            </button>
          )}
        </div>

        <Card className="relative">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-secondary">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-white/50 px-3 py-2 text-sm text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter news title"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-secondary">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-white/50 px-3 py-2 text-sm text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-secondary">Summary</label>
              <textarea
                value={form.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-white/50 px-3 py-2 text-sm text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Short summary for cards and preview"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-secondary">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-white/50 px-3 py-2 text-sm text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Write the full article content"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-secondary">Publish At</label>
                <input
                  type="date"
                  value={formatDate(form.publishedAt)}
                  onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-white/50 px-3 py-2 text-sm text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-end justify-between gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-secondary">Image URL</label>
                  <input
                    value={form.imageUrl ?? ''}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-white/50 px-3 py-2 text-sm text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Paste image URL (optional)"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-secondary">Upload</label>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-white/50 px-3 py-2 text-sm font-medium text-secondary shadow-sm hover:bg-surface-muted">
                    <UploadCloud className="h-4 w-4" />
                    <span>{imageFile ? imageFile.name : 'Upload from computer'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-secondary">
                <input
                  type="checkbox"
                  checked={form.activeStatus ?? false}
                  onChange={(e) => handleInputChange('activeStatus', e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                Active Status
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-focus disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                {isEditing ? 'Update News' : 'Create News'}
              </button>
            </div>

            {error && <p className="text-sm text-critical-strong">{error}</p>}
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-secondary">Recent News</h2>
          <span className="text-sm text-secondary/70">{sortedNews.length} items</span>
        </div>

        <div className="space-y-4">
          {loading ? (
            <Card className="text-center">Loading...</Card>
          ) : sortedNews.length === 0 ? (
            <Card className="text-center">No news items yet.</Card>
          ) : (
            sortedNews.map((item) => {
              const statusLabel = item.approved ? 'Approved' : 'Pending'
              const statusColor = item.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              return (
                <Card key={item.id ?? item._id} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}>
                          {statusLabel}
                        </span>
                        <span className="text-xs text-secondary/70">
                          {new Date(item.publishedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-secondary">{item.title}</h3>
                      <p className="text-sm text-secondary/70 line-clamp-2">{item.summary}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(item)}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/60 px-3 py-1.5 text-xs font-medium text-secondary hover:bg-surface-muted"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/60 px-3 py-1.5 text-xs font-medium text-secondary hover:bg-surface-muted"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}
