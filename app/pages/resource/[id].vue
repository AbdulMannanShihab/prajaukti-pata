<template>
  <div class="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
    <!-- Loading -->
    <div v-if="pending" class="space-y-4 animate-pulse">
      <div class="h-8 bg-slate-200 rounded w-3/4" />
      <div class="h-4 bg-slate-200 rounded w-1/4" />
      <div class="h-40 bg-slate-200 rounded-2xl" />
    </div>

    <template v-else-if="resource">
      <!-- Back -->
      <NuxtLink to="/resources" class="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition mb-6">
        <Icon name="heroicons:arrow-left" class="w-4 h-4" /> রিসোর্স তালিকায় ফিরুন
      </NuxtLink>

      <!-- Header card -->
      <div class="card p-7 mb-6">
        <div class="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-3 flex-wrap">
              <span :class="['badge', meta.bg, meta.color]">{{ meta.icon }} {{ resource.type }}</span>
              <span class="text-xs text-slate-400">{{ dateStr }}</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-4">{{ resource.title }}</h1>
            <p v-if="resource.description" class="text-slate-600 leading-relaxed">{{ resource.description }}</p>
          </div>
          <NuxtImg v-if="resource.thumbnail_url" :src="resource.thumbnail_url" :alt="resource.title" class="w-32 h-24 object-cover rounded-xl flex-shrink-0" />
        </div>

        <!-- Tags -->
        <div v-if="resource.tags?.length" class="flex flex-wrap gap-2 mb-5">
          <NuxtLink
            v-for="tag in resource.tags"
            :key="tag"
            :to="`/resources?tag=${tag}`"
            class="tag hover:bg-brand-100 hover:text-brand-700 transition"
          >{{ tag }}</NuxtLink>
        </div>

        <!-- Actions row -->
        <div class="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-slate-100">
          <!-- Author -->
          <div class="flex items-center gap-3">
             <button
              :class="['btn-secondary text-sm gap-2', liked ? '!text-red-500 !border-red-200' : '']"
              @click="handleLike"
            >
              <Icon :name="liked ? 'heroicons:heart-solid' : 'heroicons:heart'" class="w-4 h-4" />
              {{ likesCount }} লাইক
            </button>
            <button
              :class="['btn-secondary text-sm gap-2', saved ? '!text-brand-600 !border-brand-200' : '']"
              @click="handleSave"
            >
              <Icon :name="saved ? 'heroicons:bookmark-solid' : 'heroicons:bookmark'" class="w-4 h-4" />
              {{ saved ? 'সেভ করা' : 'সেভ করুন' }}
            </button>
          </div>

          <!-- Buttons -->
          <div class="flex items-center gap-2">
           
            <a :href="resource.url" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm gap-2">
              রিসোর্স খুলুন <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Edit/Delete (owner only) -->
        <div v-if="isOwner" class="flex gap-2 mt-4 pt-4 border-t border-slate-100">
          <button class="btn-secondary text-sm" @click="openEdit">
            <Icon name="heroicons:pencil" class="w-4 h-4" /> সম্পাদনা
          </button>
          <button class="btn-secondary text-sm !text-red-500 !border-red-200 hover:!bg-red-50" @click="confirmDelete">
            <Icon name="heroicons:trash" class="w-4 h-4" /> মুছুন
          </button>
        </div>
      </div>

      <!-- Comments -->
      <div class="card p-7">
        <h2 class="text-xl font-bold text-slate-800 mb-5">মন্তব্য ({{ comments.length }})</h2>

        <!-- Add comment -->
        <div v-if="isLoggedIn" class="flex gap-3 mb-6">
          <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-1">
            {{ avatarInitial }}
          </div>
          <div class="flex-1">
            <textarea
              v-model="newComment"
              rows="3"
              placeholder="মন্তব্য করুন..."
              class="input resize-none"
            />
            <button class="btn-primary text-sm mt-2" :disabled="submittingComment || !newComment.trim()" @click="submitComment">
              <span v-if="submittingComment" class="spinner" />
              <span v-else>মন্তব্য করুন</span>
            </button>
          </div>
        </div>
        <div v-else class="mb-6 p-4 bg-slate-50 rounded-xl text-center text-sm text-slate-500">
          মন্তব্য করতে
          <button class="text-brand-600 font-semibold hover:underline" @click="authModalOpen = true">সাইন ইন করুন</button>
        </div>

        <!-- Comments list -->
        <div v-if="comments.length" class="space-y-4">
          <div v-for="c in comments" :key="c.id" class="flex gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              {{ (c.profiles?.full_name || c.profiles?.username || '?').charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold text-slate-700">{{ c.profiles?.full_name || c.profiles?.username }}</span>
                <span class="text-xs text-slate-400">{{ new Date(c.created_at).toLocaleDateString('bn-BD') }}</span>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed">{{ c.content }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-center text-slate-400 text-sm py-6">প্রথম মন্তব্য করুন!</p>
      </div>
    </template>

    <!-- Not found -->
    <div v-else class="text-center py-24">
      <p class="text-5xl mb-4">😕</p>
      <p class="text-xl font-bold text-slate-700">রিসোর্স পাওয়া যায়নি</p>
      <NuxtLink to="/resources" class="btn-primary mt-4 inline-flex">ফিরে যান</NuxtLink>
    </div>

    <!-- Delete confirm modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showDeleteConfirm" class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
            <h3 class="text-lg font-bold mb-2">রিসোর্স মুছবেন?</h3>
            <p class="text-slate-500 text-sm mb-6">এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।</p>
            <div class="flex gap-3">
              <button class="btn-primary !bg-red-600 hover:!bg-red-700 flex-1" :disabled="deleting" @click="doDelete">
                <span v-if="deleting" class="spinner" />
                <span v-else>মুছুন</span>
              </button>
              <button class="btn-secondary flex-1" @click="showDeleteConfirm = false">বাতিল</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { TYPE_META } from '~/types'
import type { Comment } from '~/types'

const route = useRoute()
const id = route.params.id as string

const { fetchResource, toggleLike, toggleSave, checkUserLike, checkUserSave, deleteResource } = useResources()
const { isLoggedIn, user, avatarInitial } = useAuth()
const authModalOpen = useState('authModalOpen', () => false)
const uploadModalOpen = useState('uploadModalOpen', () => false)
const editResourceId = useState<string | null>('editResourceId', () => null)
const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const { data: resource, pending } = useAsyncData(`resource-${id}`, () => fetchResource(id))

const meta = computed(() => resource.value ? (TYPE_META[resource.value.type] ?? TYPE_META['অন্যান্য']) : TYPE_META['অন্যান্য'])
const dateStr = computed(() => resource.value ? new Date(resource.value.created_at).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : '')
const authorName = computed(() => resource.value?.profiles?.full_name || resource.value?.profiles?.username || 'অজানা')
const authorInitial = computed(() => authorName.value.charAt(0).toUpperCase())
const isOwner = computed(() => isLoggedIn.value && user.value?.id === resource.value?.user_id)

const liked = ref(false)
const saved = ref(false)
const likesCount = ref(0)

onMounted(async () => {
  if (resource.value) {
    const raw = resource.value.likes_count
    likesCount.value = Array.isArray(raw) ? (raw[0] as any)?.count ?? 0 : raw ?? 0
    if (isLoggedIn.value) {
      liked.value = await checkUserLike(id)
      saved.value = await checkUserSave(id)
    }
  }
  loadComments()
})

async function handleLike() {
  if (!isLoggedIn.value) { authModalOpen.value = true; return }
  const nowLiked = await toggleLike(id)
  liked.value = nowLiked
  likesCount.value += nowLiked ? 1 : -1
}

async function handleSave() {
  if (!isLoggedIn.value) { authModalOpen.value = true; return }
  const nowSaved = await toggleSave(id)
  saved.value = nowSaved
  toast.info(nowSaved ? 'সেভ করা হয়েছে' : 'সেভ বাতিল হয়েছে')
}

// Edit
function openEdit() {
  editResourceId.value = id
  uploadModalOpen.value = true
}

// Delete
const showDeleteConfirm = ref(false)
const deleting = ref(false)
function confirmDelete() { showDeleteConfirm.value = true }
async function doDelete() {
  deleting.value = true
  try {
    await deleteResource(id)
    toast.success('রিসোর্স মুছে ফেলা হয়েছে।')
    router.push('/resources')
  } catch { toast.error('সমস্যা হয়েছে।') }
  finally { deleting.value = false; showDeleteConfirm.value = false }
}

// Comments
const comments = ref<Comment[]>([])
const newComment = ref('')
const submittingComment = ref(false)

async function loadComments() {
  const { data } = await supabase
    .from('comments')
    .select('*, profiles:user_id(id, username, full_name)')
    .eq('resource_id', id)
    .order('created_at', { ascending: true })
  comments.value = (data ?? []) as Comment[]
}

async function submitComment() {
  if (!newComment.value.trim() || !user.value) return
  submittingComment.value = true
  const { error } = await supabase.from('comments').insert({
    resource_id: id,
    user_id: user.value.id,
    content: newComment.value.trim(),
  })
  submittingComment.value = false
  if (!error) { newComment.value = ''; loadComments() }
}

useSeoMeta({
  title: computed(() => resource.value?.title ?? 'রিসোর্স'),
  description: computed(() => resource.value?.description ?? ''),
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
