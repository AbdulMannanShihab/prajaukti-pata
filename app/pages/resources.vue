<template>
  <div class="container mx-auto px-4 md:px-6 py-10">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-800">সব রিসোর্স</h1>
        <p class="text-slate-500 mt-1 text-sm">{{ total }} টি রিসোর্স পাওয়া গেছে</p>
      </div>
      <button class="btn-primary self-start md:self-auto" @click="checkAuthThenUpload">
        <Icon name="heroicons:plus" class="w-4 h-4" />
        রিসোর্স যোগ করুন
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3 mb-8">
      <!-- Search -->
      <div class="relative flex-1">
        <Icon name="heroicons:magnifying-glass" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          v-model="search"
          type="text"
          placeholder="রিসোর্স খুঁজুন..."
          class="input pl-10"
          @input="debouncedFetch"
        />
      </div>
      <!-- Type filter -->
      <select v-model="typeFilter" class="input md:w-44" @change="doFetch">
        <option value="">সব ধরন</option>
        <option v-for="t in RESOURCE_TYPES" :key="t" :value="t">{{ t }}</option>
      </select>
      <!-- Sort -->
      <select v-model="sort" class="input md:w-44" @change="doFetch">
        <option value="new">সর্বশেষ</option>
        <option value="liked">সর্বাধিক লাইক</option>
      </select>
    </div>

    <!-- Tag cloud (from URL) -->
    <div v-if="tagFilter" class="mb-6 flex items-center gap-2 flex-wrap">
      <span class="text-sm text-slate-500">ট্যাগ ফিল্টার:</span>
      <span class="badge bg-brand-100 text-brand-700 flex items-center gap-1">
        {{ tagFilter }}
        <button @click="tagFilter = ''; doFetch()">×</button>
      </span>
    </div>

    <!-- Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <ResourceSkeleton v-for="i in 12" :key="i" />
    </div>

    <template v-else>
      <div v-if="resources.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <ResourceCard v-for="r in resources" :key="r.id" :resource="r" />
      </div>
      <div v-else class="text-center py-24 text-slate-400">
        <p class="text-5xl mb-4">🔍</p>
        <p class="text-lg font-semibold">কোনো রিসোর্স পাওয়া যায়নি</p>
        <p class="mt-2 text-sm">অন্য কীওয়ার্ড বা ফিল্টার ব্যবহার করুন</p>
      </div>

      <!-- Load more -->
      <div v-if="resources.length && resources.length < total" class="flex justify-center mt-10">
        <button class="btn-secondary" :disabled="loadingMore" @click="loadMore">
          <span v-if="loadingMore" class="spinner" />
          <span v-else>আরো দেখুন</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { RESOURCE_TYPES } from '~/types'
import type { Resource, ResourceType } from '~/types'

useSeoMeta({ title: 'সব রিসোর্স' })

const { isLoggedIn } = useAuth()
const { fetchResources } = useResources()
const authModalOpen = useState('authModalOpen', () => false)
const uploadModalOpen = useState('uploadModalOpen', () => false)
const route = useRoute()

const search = ref((route.query.q as string) || '')
const typeFilter = ref((route.query.type as string) || '')
const tagFilter = ref((route.query.tag as string) || '')
const sort = ref('new')

const PAGE = 16
const offset = ref(0)
const resources = ref<Resource[]>([])
const total = ref(0)
const pending = ref(true)
const loadingMore = ref(false)

const supabase = useSupabaseClient()

async function doFetch(reset = true) {
  if (reset) { offset.value = 0; pending.value = true }
  try {
    let query = supabase
      .from('resources')
      .select(`*, profiles:user_id(id, username, full_name, avatar_url), likes_count:likes(count), saves_count:saves(count)`, { count: 'exact' })
      .range(offset.value, offset.value + PAGE - 1)

    if (typeFilter.value) query = query.eq('type', typeFilter.value)
    if (search.value) query = query.ilike('title', `%${search.value}%`)
    if (tagFilter.value) query = query.contains('tags', [tagFilter.value])
    if (sort.value === 'new') query = query.order('created_at', { ascending: false })

    const { data, count } = await query
    if (reset) resources.value = (data ?? []) as Resource[]
    else resources.value.push(...((data ?? []) as Resource[]))
    total.value = count ?? 0
  } finally {
    pending.value = false
    loadingMore.value = false
  }
}

const debouncedFetch = useDebounceFn(() => doFetch(), 400)

async function loadMore() {
  loadingMore.value = true
  offset.value += PAGE
  await doFetch(false)
}

async function checkAuthThenUpload() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { authModalOpen.value = true; return }
  uploadModalOpen.value = true
}

watch(() => route.query.q, (v) => { search.value = (v as string) || ''; doFetch() })
watch(() => route.query.type, (v) => { typeFilter.value = (v as string) || ''; doFetch() })

onMounted(() => doFetch())
</script>