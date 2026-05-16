'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Heart, Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface AssetSaveButtonProps {
  assetId: string
  assetCategory: string
  assetTitle: string
  assetPrice: number
  assetImage: string
}

export default function AssetSaveButton({
  assetId,
  assetCategory,
  assetTitle,
  assetPrice,
  assetImage,
}: AssetSaveButtonProps) {
  const router = useRouter()
  const supabase = createClient()

  const [saved, setSaved] = useState(false)
  const [owned, setOwned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function init() {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)

      if (currentUser) {
        const { data } = await supabase
          .from('user_assets')
          .select('status')
          .eq('user_id', currentUser.id)
          .eq('asset_id', assetId)
          .maybeSingle()

        if (data) {
          setSaved(data.status === 'saved')
          setOwned(data.status === 'owned')
        }
      }
    }

    init()
  }, [assetId])

  function redirectToAuth() {
    router.push(`/auth?next=/lifestyle/${assetCategory}/${assetId}`)
  }

  async function handleSave() {
    if (!user) {
      redirectToAuth()
      return
    }

    setLoading(true)
    try {
      if (saved) {
        await fetch('/api/user-assets', {
          method: 'DELETE',
          body: JSON.stringify({ asset_id: assetId }),
          headers: { 'Content-Type': 'application/json' },
        })
        setSaved(false)
      } else {
        await fetch('/api/user-assets', {
          method: 'POST',
          body: JSON.stringify({
            asset_id: assetId,
            asset_category: assetCategory,
            asset_title: assetTitle,
            asset_price: assetPrice,
            asset_image: assetImage,
            status: 'saved',
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        setSaved(true)
        setOwned(false)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleOwn() {
    if (!user) {
      redirectToAuth()
      return
    }

    setLoading(true)
    try {
      if (owned) {
        await fetch('/api/user-assets', {
          method: 'DELETE',
          body: JSON.stringify({ asset_id: assetId }),
          headers: { 'Content-Type': 'application/json' },
        })
        setOwned(false)
      } else {
        await fetch('/api/user-assets', {
          method: 'POST',
          body: JSON.stringify({
            asset_id: assetId,
            asset_category: assetCategory,
            asset_title: assetTitle,
            asset_price: assetPrice,
            asset_image: assetImage,
            status: 'owned',
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        setOwned(true)
        setSaved(false)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Save button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        aria-label={saved ? 'Remove from saved' : 'Save asset'}
        aria-pressed={saved}
        className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: saved ? 'rgba(201,168,76,0.08)' : 'transparent',
          border: saved
            ? '1px solid rgba(201,168,76,0.5)'
            : '1px solid var(--color-border)',
          color: saved ? 'var(--color-gold-light)' : 'var(--color-gray)',
        }}
        onMouseEnter={e => {
          if (!saved) {
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
            e.currentTarget.style.color = 'var(--color-gold)'
          }
        }}
        onMouseLeave={e => {
          if (!saved) {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-gray)'
          }
        }}
      >
        <Heart
          className="w-4 h-4 shrink-0"
          fill={saved ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        {saved ? 'Saved' : 'Save'}
      </button>

      {/* Mark Owned button */}
      <button
        type="button"
        onClick={handleOwn}
        disabled={loading}
        aria-label={owned ? 'Remove from owned' : 'Mark as owned'}
        aria-pressed={owned}
        className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: owned ? 'rgba(74,222,128,0.08)' : 'var(--color-surface-2)',
          border: owned
            ? '1px solid rgba(74,222,128,0.5)'
            : '1px solid var(--color-border)',
          color: owned ? '#4ade80' : 'var(--color-gray)',
        }}
        onMouseEnter={e => {
          if (!owned) {
            e.currentTarget.style.borderColor = 'rgba(74,222,128,0.35)'
            e.currentTarget.style.color = '#4ade80'
          }
        }}
        onMouseLeave={e => {
          if (!owned) {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-gray)'
          }
        }}
      >
        <Briefcase
          className="w-4 h-4 shrink-0"
          aria-hidden="true"
        />
        {owned ? 'Owned' : 'Mark Owned'}
      </button>
    </div>
  )
}
