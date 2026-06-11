<template>
  <article class="card p-5 flex flex-col gap-3 group">
    <!-- Type badge + date -->
    <div class="flex items-center justify-between">
      <span :class="['badge', meta.bg, meta.color]">
        {{ meta.icon }} {{ resource.type }}
      </span>
      <span class="text-xs text-slate-400">{{ dateStr }}</span>
    </div>

    <!-- Thumbnail (if any) -->
    <NuxtImg
      v-if="resource.thumbnail_url"
      :src="resource.thumbnail_url"
      :alt="resource.title"
      class="w-full h-36 object-cover rounded-xl"
      loading="lazy"
    />

    <!-- Title -->
    <NuxtLink :to="`/resource/${resource.id}`">
      <h3 class="font-bold text-slate-800 text-base leading-snug group-hover:text-brand-600 transition line-clamp-2">
        {{ resource.title }}
      </h3>
    </NuxtLink>

    <!-- Description -->
    <p v-if="resource.description" class="text-slate-500 text-sm leading-relaxed line-clamp-2">
      {{ resource.description }}
    </p>

    <!-- Tags -->
    <div v-if="resource.tags?.length" class="flex flex-wrap gap-1.5">
      <span v-for="tag in resource.tags.slice(0, 4)" :key="tag" class="tag">{{ tag }}</span>
      <span v-if="resource.tags.length > 4" class="tag">+{{ resource.tags.length - 4 }}</span>
    </div>

    <!-- Footer: author + actions -->
    <div class="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
      <!-- Author -->
      <div class="flex items-center gap-2 text-xs text-slate-500 min-w-0">
        <div class="w-6 h-6 rounded-full bg-brand-100 text-brand-600 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
          {{ authorInitial }}
        </div>
        <span class="truncate">{{ authorName }}</span>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-1 text-xs font-semibold transition"
          :class="liked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'"
          @click.prevent="handleLike"
        >
          <Icon :name="liked ? 'heroicons:heart-solid' : 'heroicons:heart'" class="w-4 h-4" />
          {{ likesCount }}
        </button>
        <button
          class="flex items-center gap-1 text-xs font-semibold transition"
          :class="saved ? 'text-brand-500' : 'text-slate-400 hover:text-brand-400'"
          @click.prevent="handleSave"
        >
          <Icon :name="saved ? 'heroicons:bookmark-solid' : 'heroicons:bookmark'" class="w-4 h-4" />
        </button>
        <a
          :href="resource.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-600 hover:text-brand-800 transition"
          @click.stop
        >
          <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Resource } from '~/types'
import { TYPE_META } from '~/types'

const props = defineProps<{ resource: Resource }>()

const { isLoggedIn } = useAuth()
const { toggleLike, toggleSave, checkUserLike, checkUserSave } = useResources()
const authModalOpen = useState('authModalOpen', () => false)
const toast = useToast()

const meta = computed(() => TYPE_META[props.resource.type] ?? TYPE_META['অন্যান্য'])
const dateStr = computed(() =>
  new Date(props.resource.created_at).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' })
)
const authorName = computed(() =>
  props.resource.profiles?.full_name || props.resource.profiles?.username || 'অজানা'
)
const authorInitial = computed(() => authorName.value.charAt(0).toUpperCase())

const liked = ref(props.resource.user_has_liked ?? false)
const saved = ref(props.resource.user_has_saved ?? false)
const likesCount = ref(
  Array.isArray(props.resource.likes_count) ? (props.resource.likes_count[0] as any)?.count ?? 0 : (props.resource.likes_count ?? 0)
)

onMounted(async () => {
  if (isLoggedIn.value) {
    liked.value = await checkUserLike(props.resource.id)
    saved.value = await checkUserSave(props.resource.id)
  }
})

async function handleLike() {
  if (!isLoggedIn.value) { authModalOpen.value = true; return }
  const nowLiked = await toggleLike(props.resource.id)
  liked.value = nowLiked
  likesCount.value += nowLiked ? 1 : -1
}

async function handleSave() {
  if (!isLoggedIn.value) { authModalOpen.value = true; return }
  const nowSaved = await toggleSave(props.resource.id)
  saved.value = nowSaved
  toast.info(nowSaved ? 'সেভ করা হয়েছে' : 'সেভ বাতিল হয়েছে')
}
</script>
