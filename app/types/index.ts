export type ResourceType =
  | 'ব্লগ'
  | 'টিউটোরিয়াল'
  | 'ভিডিও'
  | 'টুল'
  | 'বই'
  | 'কোর্স'
  | 'অন্যান্য'

export interface Resource {
  id: string
  title: string
  description: string | null
  url: string
  type: ResourceType
  tags: string[]
  thumbnail_url: string | null
  user_id: string
  created_at: string
  updated_at: string
  // joined
  profiles?: Profile
  likes_count?: number
  saves_count?: number
  user_has_liked?: boolean
  user_has_saved?: boolean
}

export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  description: string | null
  resource_count?: number
}

export interface Comment {
  id: string
  resource_id: string
  user_id: string
  content: string
  created_at: string
  profiles?: Profile
}

export interface Like {
  id: string
  resource_id: string
  user_id: string
  created_at: string
}

export interface Save {
  id: string
  resource_id: string
  user_id: string
  created_at: string
}

export const RESOURCE_TYPES: ResourceType[] = [
  'ব্লগ',
  'টিউটোরিয়াল',
  'ভিডিও',
  'টুল',
  'বই',
  'কোর্স',
  'অন্যান্য',
]

export const TYPE_META: Record<ResourceType, { color: string; bg: string; icon: string }> = {
  'ব্লগ':       { color: 'text-purple-700', bg: 'bg-purple-100', icon: '✍️' },
  'টিউটোরিয়াল':{ color: 'text-blue-700',   bg: 'bg-blue-100',   icon: '📖' },
  'ভিডিও':     { color: 'text-red-700',     bg: 'bg-red-100',    icon: '🎬' },
  'টুল':       { color: 'text-green-700',   bg: 'bg-green-100',  icon: '🔧' },
  'বই':        { color: 'text-amber-700',   bg: 'bg-amber-100',  icon: '📚' },
  'কোর্স':     { color: 'text-indigo-700',  bg: 'bg-indigo-100', icon: '🎓' },
  'অন্যান্য':  { color: 'text-slate-600',   bg: 'bg-slate-100',  icon: '📌' },
}
