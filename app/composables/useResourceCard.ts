// app/composables/useResourceCard.ts
// Deterministic color + abbreviation for a resource card, since
// public.resources has no bg/color/abbr columns.

const PALETTE = [
  { bg: 'bg-blue-100', text: 'text-blue-700', hex: '#1d4ed8' },
  { bg: 'bg-red-100', text: 'text-red-700', hex: '#b91c1c' },
  { bg: 'bg-green-100', text: 'text-green-700', hex: '#15803d' },
  { bg: 'bg-orange-100', text: 'text-orange-700', hex: '#c2410c' },
  { bg: 'bg-purple-100', text: 'text-purple-700', hex: '#7e22ce' },
  { bg: 'bg-yellow-100', text: 'text-yellow-700', hex: '#a16207' },
  { bg: 'bg-pink-100', text: 'text-pink-700', hex: '#be185d' },
  { bg: 'bg-teal-100', text: 'text-teal-700', hex: '#0f766e' },
]

export function useResourceCard() {
  function styleFor(title: string) {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash)
    }
    return PALETTE[Math.abs(hash) % PALETTE.length]
  }

  function abbrFor(title: string) {
    const words = title.trim().split(/\s+/)
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
    return title.slice(0, 2).toUpperCase()
  }

  return { styleFor, abbrFor }
}