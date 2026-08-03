import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface StoredUser {
  id: number | null
  username: string | null
  avatar: string | null
  isAuthenticated: boolean
}

const readStoredUser = (): StoredUser | null => {
  try {
    const raw = localStorage.getItem('user-storage')
    if (!raw) return null
    const { state } = JSON.parse(raw)
    return state ?? null
  } catch {
    return null
  }
}

const Avatar = () => {
  const [user, setUser] = useState<StoredUser | null>(readStoredUser)

  useEffect(() => {
    const handleStorage = () => setUser(readStoredUser())
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  if (!user?.isAuthenticated) return null

  return (
    <Link to="/profile" className="flex items-center gap-2 group">
      {user.avatar ? (
        <img
          className="rounded-full w-12 h-12 object-cover"
          src={user.avatar}
          alt={user.username ?? 'User Avatar'}
        />
      ) : (
        <div className="rounded-full w-12 h-12 bg-text-primary flex items-center justify-center">
          <span className="text-background-primary font-bold text-xl">
            {user.username?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <span className="hidden xl:inline text-text-secondary font-bold group-hover:text-red transition-colors">
        {user.username}
      </span>
    </Link>
  )
}

export default Avatar
