import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Newspaper } from 'lucide-react'
import { fetchPublicNews } from '../services/newsService'
import type { NewsDto } from '../types'

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchPublicNews()
        setArticles(data)
      } catch (err) {
        setError('Unable to load news. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Newspaper className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">News & Updates</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Latest News</h1>
          <p className="text-secondary/60 mt-2">
            Stay updated with the latest announcements, initiatives, and achievements at NTNSP.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-secondary/70">Loading news...</div>
        ) : error ? (
          <div className="text-center text-critical-strong">{error}</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-secondary/70">No news available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id ?? article._id} hover className="flex flex-col overflow-hidden">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                    {article.category}
                  </span>
                  <h2 className="text-lg font-bold text-secondary mb-2">{article.title}</h2>
                  <p className="text-sm text-secondary/70 mb-4">{article.summary}</p>
                </div>
                <div className="text-xs text-secondary/60 border-t border-border pt-3">
                  <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
                  {article.author && <p>By {article.author}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
