<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
        @click.self="close"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <!-- Header (always visible, never scrolls away) -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-slate-200 flex-shrink-0">
            <h2 class="text-lg font-bold text-slate-800">
              {{ editId ? 'রিসোর্স সম্পাদনা' : 'নতুন রিসোর্স যোগ করুন' }}
            </h2>
            <button class="text-slate-400 hover:text-slate-600 transition" @click="close">
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>

          <!-- Loading state while fetching the resource to edit -->
          <div v-if="loadingResource" class="p-6 space-y-4 animate-pulse">
            <div class="h-4 bg-slate-200 rounded w-1/3" />
            <div class="h-10 bg-slate-200 rounded" />
            <div class="h-10 bg-slate-200 rounded" />
            <div class="h-24 bg-slate-200 rounded" />
          </div>

          <!-- Form (scrolls internally if it's taller than the modal) -->
          <form v-else class="p-6 space-y-5 overflow-y-auto" @submit.prevent="submit">
            <!-- Title -->
            <div>
              <label class="label">শিরোনাম <span class="text-red-500">*</span></label>
              <input v-model="form.title" class="input" placeholder="রিসোর্সের শিরোনাম লিখুন" required />
            </div>

            <!-- Type + URL row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="label">ধরন <span class="text-red-500">*</span></label>
                <select v-model="form.type" class="input" required>
                  <option value="" disabled>বেছে নিন</option>
                  <option v-for="t in RESOURCE_TYPES" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
              <div>
                <label class="label">লিংক <span class="text-red-500">*</span></label>
                <input v-model="form.url" type="url" class="input" placeholder="https://" required />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="label">বিবরণ</label>
              <textarea
                v-model="form.description"
                rows="3"
                class="input resize-none"
                placeholder="সংক্ষিপ্ত বিবরণ লিখুন..."
              />
            </div>

            <!-- Thumbnail -->
            <div>
              <label class="label">থাম্বনেইল URL</label>
              <input v-model="form.thumbnail_url" type="url" class="input" placeholder="https://..." />
            </div>

            <!-- Tags -->
            <div>
              <label class="label">
                ট্যাগ
                <span class="text-slate-400 font-normal text-xs ml-1">(এন্টার বা কমা দিয়ে যোগ করুন)</span>
              </label>
              <div class="input min-h-[44px] flex flex-wrap gap-1.5 cursor-text" @click="tagInputRef?.focus()">
                <span
                  v-for="tag in form.tags"
                  :key="tag"
                  class="tag flex items-center gap-1"
                >
                  {{ tag }}
                  <button type="button" class="hover:text-red-500 transition" @click.stop="removeTag(tag)">×</button>
                </span>
                <input
                  ref="tagInputRef"
                  v-model="tagInput"
                  class="flex-1 min-w-[80px] bg-transparent outline-none text-sm"
                  placeholder="ট্যাগ যোগ করুন..."
                  @keydown.enter.prevent="addTag"
                  @keydown.comma.prevent="addTag"
                  @keydown.backspace="onTagBackspace"
                />
              </div>
            </div>

            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

            <div class="flex items-center gap-3 pt-1">
              <button type="submit" class="btn-primary flex-1" :disabled="saving">
                <span v-if="saving" class="spinner" />
                <span v-else>{{ editId ? 'আপডেট করুন' : 'শেয়ার করুন' }}</span>
              </button>
              <button type="button" class="btn-secondary" @click="close">বাতিল</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { RESOURCE_TYPES } from '~/types'
import type { ResourceType } from '~/types'

const open = useState('uploadModalOpen', () => false)
const editId = useState<string | null>('editResourceId', () => null)
// Set by the resource detail page when it already has the resource loaded,
// so we can skip re-fetching. Falls back to a fetch if this isn't set
// (e.g. modal opened for edit from somewhere that doesn't have it handy).
const editData = useState<any | null>('editResourceData', () => null)

const { createResource, updateResource, fetchResource } = useResources()
const { isLoggedIn } = useAuth()
const toast = useToast()
const router = useRouter()

const saving = ref(false)
const loadingResource = ref(false)
const error = ref('')
const tagInput = ref('')
const tagInputRef = ref<HTMLInputElement | null>(null)

const form = reactive({
  title: '',
  type: '' as ResourceType | '',
  url: '',
  description: '',
  thumbnail_url: '',
  tags: [] as string[],
})

function fillFormFrom(r: any) {
  form.title = r.title ?? ''
  form.type = (r.type ?? '') as ResourceType | ''
  form.url = r.url ?? ''
  form.description = r.description ?? ''
  form.thumbnail_url = r.thumbnail_url ?? ''
  form.tags = Array.isArray(r.tags) ? [...r.tags] : []
}

function resetForm() {
  Object.assign(form, { title: '', type: '', url: '', description: '', thumbnail_url: '', tags: [] })
}

// Populate (or reset) the form whenever the modal opens.
watch(open, async (isOpen) => {
  if (!isOpen) return

  if (editId.value) {
    if (editData.value && editData.value.id === editId.value) {
      // Already have the resource from the caller — use it directly.
      fillFormFrom(editData.value)
    } else {
      // Fallback: fetch it ourselves.
      loadingResource.value = true
      try {
        const r = await fetchResource(editId.value)
        if (r) fillFormFrom(r)
      } catch (e) {
        error.value = 'রিসোর্স লোড করা যায়নি।'
      } finally {
        loadingResource.value = false
      }
    }
  } else {
    resetForm()
  }
})

function addTag() {
  const tag = tagInput.value.replace(',', '').trim()
  if (tag && !form.tags.includes(tag)) form.tags.push(tag)
  tagInput.value = ''
}

function removeTag(tag: string) {
  form.tags = form.tags.filter((t) => t !== tag)
}

function onTagBackspace() {
  if (!tagInput.value && form.tags.length) form.tags.pop()
}

function close() {
  open.value = false
  editId.value = null
  editData.value = null
  error.value = ''
  resetForm()
}

async function submit() {
  if (!isLoggedIn.value) { open.value = false; useState('authModalOpen').value = true; return }
  if (!form.type) { error.value = 'ধরন বেছে নিন।'; return }

  saving.value = true
  error.value = ''

  try {
    if (editId.value) {
      await updateResource(editId.value, { ...form, type: form.type as ResourceType })
      toast.success('রিসোর্স আপডেট হয়েছে!')
    } else {
      const res = await createResource({ ...form, type: form.type as ResourceType })
      toast.success('রিসোর্স শেয়ার হয়েছে!')
      router.push(`/resource/${res.id}`)
    }
    close()
  } catch (e: any) {
    error.value = e.message || 'সমস্যা হয়েছে।'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>