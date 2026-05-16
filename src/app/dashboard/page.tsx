import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ALL_LIFESTYLE_ASSETS } from '@/lib/lifestyle-data'
import { FEATURED_PROPERTIES } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '@/components/shared/SectionHeader'

interface DashboardAsset {
  id: string
  asset_id: string
  asset_category: string
  asset_title: string
  asset_price: number | null
  asset_image: string | null
  status: 'saved' | 'owned'
  created_at: string
}

function formatValue(total: number): string {
  if (total >= 1_000_000) return `$${(total / 1_000_000).toFixed(1)}M`
  if (total >= 1_000) return `$${(total / 1_000).toFixed(0)}K`
  return `$${total}`
}

function DashboardAssetCard({ asset }: { asset: DashboardAsset }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-[2px]"
      style={{
        backgroundColor: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Image */}
      <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-[2px]">
        {asset.asset_image ? (
          <Image
            src={asset.asset_image}
            alt={asset.asset_title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-muted)' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{asset.asset_title}</p>
        <span
          className="inline-block mt-1 text-[0.6rem] tracking-[0.18em] uppercase font-semibold"
          style={{ color: 'var(--color-gold)' }}
        >
          {asset.asset_category}
        </span>
        {asset.asset_price !== null && (
          <p
            className="mt-0.5 text-base font-light"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-gold-light)',
            }}
          >
            {formatValue(asset.asset_price)}
          </p>
        )}
      </div>

      {/* Status + Remove */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span
          className="inline-flex items-center px-2 py-0.5 text-[0.6rem] tracking-[0.15em] uppercase font-semibold rounded-[2px]"
          style={
            asset.status === 'owned'
              ? { color: '#4ade80', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }
              : { color: 'var(--color-gray)', backgroundColor: 'rgba(136,136,150,0.1)', border: '1px solid rgba(136,136,150,0.2)' }
          }
        >
          {asset.status === 'owned' ? 'Owned' : 'Saved'}
        </span>
        <form
          action="/api/user-assets/remove"
          method="POST"
        >
          <input type="hidden" name="asset_id" value={asset.asset_id} />
          <button
            type="submit"
            className="flex items-center justify-center w-7 h-7 rounded-[2px] transition-all duration-200"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
            }}
            title="Remove asset"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="p-5 rounded-[2px]"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <p
        className="text-2xl font-light mb-1"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          color: 'var(--color-gold-light)',
        }}
      >
        {value}
      </p>
      <p className="text-xs tracking-[0.15em] uppercase font-medium" style={{ color: 'var(--color-gray)' }}>
        {label}
      </p>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth')

  const { data: savedAssets } = await supabase
    .from('user_assets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const assets: DashboardAsset[] = savedAssets ?? []
  const owned = assets.filter(a => a.status === 'owned')
  const saved = assets.filter(a => a.status === 'saved')

  const portfolioValue = owned.reduce((sum, a) => sum + (a.asset_price ?? 0), 0)
  const wishlistValue = saved.reduce((sum, a) => sum + (a.asset_price ?? 0), 0)

  const displayName = user.email?.split('@')[0] ?? 'there'

  return (
    <div
      className="min-h-screen py-12"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div>
            <h1
              className="text-3xl font-light text-white mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Good morning, {displayName}
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
              Your luxury portfolio at a glance.
            </p>
          </div>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="btn-outline text-xs py-2 px-4"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard value={saved.length.toString()} label="Saved Assets" />
          <StatCard value={owned.length.toString()} label="Owned Assets" />
          <StatCard value={portfolioValue > 0 ? formatValue(portfolioValue) : '—'} label="Portfolio Value" />
          <StatCard value={wishlistValue > 0 ? formatValue(wishlistValue) : '—'} label="Wishlist Value" />
        </div>

        {/* Owned Assets */}
        {owned.length > 0 && (
          <section className="mb-12">
            <SectionHeader
              eyebrow="Portfolio"
              title="My Portfolio"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {owned.map(asset => (
                <DashboardAssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </section>
        )}

        {/* Saved Assets */}
        {saved.length > 0 && (
          <section className="mb-12">
            <SectionHeader
              eyebrow="Collection"
              title="Saved Collection"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {saved.map(asset => (
                <DashboardAssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {assets.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-[2px] text-center"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-gold)' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p
              className="text-xl font-light mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-white)' }}
            >
              Your collection is empty
            </p>
            <p className="text-sm mb-7 max-w-sm" style={{ color: 'var(--color-gray)' }}>
              Browse assets to save or mark them as owned.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/lifestyle" className="btn-gold text-xs py-2.5 px-6">
                Browse Lifestyle
              </Link>
              <Link href="/buy" className="btn-outline text-xs py-2.5 px-6">
                Browse Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
