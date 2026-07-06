<template>
  <div>
    <!-- Hero -->
    <section class="gradient-hero text-white py-20 md:py-28 px-6 text-center">
      <div class="max-w-4xl mx-auto">
        <p class="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <Icon name="heroicons:sparkles" class="w-4 h-4 text-yellow-300" />
          বাংলাদেশের সেরা টেক লার্নিং প্ল্যাটফর্ম
        </p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight font-bangla-serif">
          দক্ষতা অর্জন করুন <br class="hidden md:block" />
          <span class="text-brand-300">মাতৃভাষায়</span>
        </h1>
        <p class="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          সেরা মেন্টর, লার্নিং প্ল্যাটফর্ম, ইউটিউব চ্যানেল এবং কমিউনিটি রিসোর্সের পূর্ণাঙ্গ ডিরেক্টরি।
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/resources" class="bg-white text-brand-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition shadow-xl">
            রিসোর্স দেখুন
          </NuxtLink>
          <button aria-label="রিসোর্স শেয়ার করুন"
            class="bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition border border-white/20"
            @click="checkAuthThenUpload"
          >
            রিসোর্স শেয়ার করুন
          </button>
        </div>
        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-8 mt-14 text-sm">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
            <p class="text-blue-200 mt-0.5">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script setup lang="ts">
import { RESOURCE_TYPES } from '~/types'
import type { ResourceType } from '~/types'

useSeoMeta({
  title: 'হোম',
  description: 'বাংলাদেশের সেরা টেক রিসোর্স, টিউটোরিয়াল ও কমিউনিটি প্ল্যাটফর্ম — প্রযুক্তি পাতা।',
})

const { isLoggedIn } = useAuth()
const { fetchResources } = useResources()
const authModalOpen = useState('authModalOpen', () => false)
const uploadModalOpen = useState('uploadModalOpen', () => false)

const activeType = ref<string>('সব')

async function checkAuthThenUpload() {
  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { authModalOpen.value = true; return }
  uploadModalOpen.value = true
}

const { data: resources, pending } = useAsyncData(
  'home-resources',
  () => fetchResources({ type: activeType.value === 'সব' ? null : activeType.value as ResourceType, limit: 8 }),
  { watch: [activeType] }
)

const { data: totalCount } = useAsyncData('resource-count', async () => {
  const supabase = useSupabaseClient()
  const { count } = await supabase.from('resources').select('*', { count: 'exact', head: true })
  return count ?? 0
})

const stats = computed(() => [
  { value: `${totalCount.value ?? '...'}+`, label: 'রিসোর্স' },
  { value: '১০+', label: 'ক্যাটাগরি' },
  { value: '৫০০+', label: 'শিক্ষার্থী' },
])

const learningPlatforms = [
  { name: 'Polash Mahmud', url: 'https://polashmahmud.com/courses', color: '#4f46e5', desc: 'পলাশ মাহমুদের প্রিমিয়াম ও ফ্রি ওয়েব ডেভেলপমেন্ট কোর্স।' },
  { name: 'Innovative Skills BD', url: 'https://innovativeskillsbd.com/', color: '#2563eb', desc: 'আইটি স্কিল ডেভেলপমেন্ট ও প্রফেশনাল ট্রেনিংয়ের আধুনিক প্ল্যাটফর্ম।' },
  { name: 'শিখুন.নেট', url: 'https://shikhun.net', color: '#ea580c', desc: 'সহজ বাংলায় ফ্রিল্যান্সিং ও ক্যারিয়ার ফোকাসড ভিডিও লার্নিং।' },
]
</script>