import { useEffect, useMemo, useState } from 'react'
import { PlusCircle, RefreshCw, Search, User, Shield, Edit3, Trash2, X } from 'lucide-react'
import { fetchUsers, assignUserAccess, removeUserAccess, RbacUser } from '../services/usersService'
import { RBAC_FUNCTION, RBAC_FUNCTIONS } from '../constants/rbac'

type PermissionRow = {
  id: string
  function: string
  authority: string
}

type FormState = {
  username: string
  isSuperAdmin: boolean
  permissions: PermissionRow[]
}

const AUTH_LABEL: Record<string, { label: string; color: string }> = {
  E: { label: 'Enter', color: 'bg-blue-100 text-blue-700' },
  C: { label: 'Check', color: 'bg-slate-100 text-slate-700' },
  A: { label: 'Approve', color: 'bg-amber-100 text-amber-700' },
  M: { label: 'Manager', color: 'bg-emerald-100 text-emerald-700' },
}

const roleBadge = (user: RbacUser) => {
  if (user.isSuperAdmin) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
        <Shield className="h-3.5 w-3.5" />
        SuperAdmin
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      <User className="h-3.5 w-3.5" />
      Standard User
    </span>
  )
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<RbacUser[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormState>({
    username: '',
    isSuperAdmin: false,
    permissions: RBAC_FUNCTIONS.map((fn, idx) => ({
      id: String(idx),
      function: fn,
      authority: 'E',
    })),
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const u = await fetchUsers()
      setUsers(u)
    } catch (err) {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter((user) => {
      const matchByName = user.username.toLowerCase().includes(q)
      const matchByPerm = user.functionPermissions.some((p) =>
        `${p.function} ${p.authority}`.toLowerCase().includes(q)
      )
      return matchByName || matchByPerm
    })
  }, [search, users])

  const stats = useMemo(() => {
    const total = users.length
    const superAdmins = users.filter((u) => u.isSuperAdmin).length
    const regular = total - superAdmins
    const withPermissions = users.filter((u) => (u.functionPermissions || []).length > 0).length
    return { total, superAdmins, regular, withPermissions }
  }, [users])

  const closeModal = () => {
    setModalOpen(false)
    setForm({
      username: '',
      isSuperAdmin: false,
      permissions: RBAC_FUNCTIONS.map((fn, idx) => ({
        id: String(idx),
        function: fn,
        authority: 'E',
      })),
    })
    setError(null)
    setSuccess(null)
  }

  const handleSave = async () => {
    if (!form.username.trim()) {
      setError('Username is required')
      return
    }

    if (!form.isSuperAdmin && form.permissions.length === 0) {
      setError('Provide at least one permission or enable SuperAdmin')
      return
    }

    try {
      const payload = {
        username: form.username.trim(),
        isSuperAdmin: form.isSuperAdmin,
        functionPermissions: form.isSuperAdmin
          ? []
          : form.permissions
              .filter((p) => p.function && p.authority)
              .map((p) => ({ function: p.function as any, authority: p.authority as any })),
      }

      await assignUserAccess(payload)
      setSuccess('User access saved')
      await loadUsers()
    } catch (err) {
      setError('Unable to save user access')
    }
  }

  const handleDelete = async (username: string) => {
    if (!window.confirm(`Remove access for ${username}?`)) return
    try {
      await removeUserAccess(username)
      await loadUsers()
    } catch {
      setError('Failed to remove user')
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">User Access Management</h1>
          <p className="text-sm text-gray-600">Manage RBAC permissions for system users</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadUsers}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary hover:bg-surface-muted transition"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition"
          >
            <PlusCircle className="h-4 w-4" />
            Add User
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total Users</p>
          <p className="mt-2 text-3xl font-semibold text-secondary">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">SuperAdmins</p>
          <p className="mt-2 text-3xl font-semibold text-secondary">{stats.superAdmins}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Regular Users</p>
          <p className="mt-2 text-3xl font-semibold text-secondary">{stats.regular}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">With Permissions</p>
          <p className="mt-2 text-3xl font-semibold text-secondary">{stats.withPermissions}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search by username or permission"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 font-semibold text-secondary">User</th>
                <th className="px-4 py-3 font-semibold text-secondary">Role</th>
                <th className="px-4 py-3 font-semibold text-secondary">Function Permissions</th>
                <th className="px-4 py-3 font-semibold text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.username} className="hover:bg-surface-muted">
                    <td className="px-4 py-4">
                      <div className="font-medium text-secondary">{user.username}</div>
                      {user.lastLogin && (
                        <div className="text-xs text-gray-500">Last login: {new Date(user.lastLogin).toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">{roleBadge(user)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {user.isSuperAdmin ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                            Full Access to All Functions
                          </span>
                        ) : (
                          (user.functionPermissions || []).map((perm) => {
                            const meta = AUTH_LABEL[perm.authority]
                            return (
                              <span
                                key={`${user.username}-${perm.function}`}
                                className={`${meta.color} rounded-full px-3 py-1 text-xs font-semibold`}
                              >
                                {perm.function} · {meta.label}
                              </span>
                            )
                          })
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setModalOpen(true)
                          setForm({
                            username: user.username,
                            isSuperAdmin: user.isSuperAdmin,
                            permissions: RBAC_FUNCTIONS.reduce((acc, fn) => {
                              const perm = user.functionPermissions?.find((p) => p.function === fn)
                              return { ...acc, [fn]: perm?.authority || 'E' }
                            }, {} as Record<string, string>),
                          })
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-surface px-3 py-2 text-xs font-medium text-secondary border border-border hover:bg-surface-muted transition"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.username)}
                        className="ml-2 inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 border border-red-200 hover:bg-red-100 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-secondary mb-3">Permission Reference</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold text-secondary">E – Enter</h3>
            <p className="mt-1 text-xs text-gray-600">View + Create; can edit only unapproved content.</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold text-secondary">C – Check</h3>
            <p className="mt-1 text-xs text-gray-600">View-only access.</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold text-secondary">A – Approve</h3>
            <p className="mt-1 text-xs text-gray-600">View + Approve / Reject content.</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold text-secondary">M – Manager</h3>
            <p className="mt-1 text-xs text-gray-600">Full access: View, Create, Edit, Delete, Approve.</p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-secondary">Add New User</h2>
                <p className="text-sm text-gray-600">Assign RBAC permissions to a user</p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
              )}
              {success && (
                <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-secondary">
                  Username (EPF Number)
                  <input
                    value={form.username}
                    onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 123456"
                  />
                </label>

                <label className="flex items-center gap-2 text-sm font-medium text-secondary">
                  <input
                    type="checkbox"
                    checked={form.isSuperAdmin}
                    onChange={(e) => setForm((prev) => ({ ...prev, isSuperAdmin: e.target.checked }))}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  Super Admin (full access)
                </label>
              </div>

              {!form.isSuperAdmin && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-secondary">Function Permissions</p>
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          permissions: [
                            ...prev.permissions,
                            {
                              id: String(Date.now()),
                              function: RBAC_FUNCTIONS[0],
                              authority: 'E',
                            },
                          ],
                        }))
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary/90 transition"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Permission
                    </button>
                  </div>

                  <div className="space-y-3">
                    {form.permissions.map((perm) => (
                      <div
                        key={perm.id}
                        className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 items-end rounded-2xl border border-border bg-surface p-4"
                      >
                        <label className="space-y-1 text-sm font-medium text-secondary">
                          Function
                          <select
                            value={perm.function}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                permissions: prev.permissions.map((p) =>
                                  p.id === perm.id ? { ...p, function: e.target.value } : p
                                ),
                              }))
                            }
                            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            {RBAC_FUNCTIONS.map((fn) => (
                              <option key={fn} value={fn}>
                                {fn}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="space-y-1 text-sm font-medium text-secondary">
                          Role
                          <select
                            value={perm.authority}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                permissions: prev.permissions.map((p) =>
                                  p.id === perm.id ? { ...p, authority: e.target.value } : p
                                ),
                              }))
                            }
                            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="E">E - Enter</option>
                            <option value="C">C - Check</option>
                            <option value="A">A - Approve</option>
                            <option value="M">M - Manager</option>
                          </select>
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              permissions: prev.permissions.filter((p) => p.id !== perm.id),
                            }))
                          }
                          className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-4">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-surface-muted transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
