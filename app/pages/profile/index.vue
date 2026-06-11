<template>
  <div class="container mx-auto px-4 md:px-6 py-10 max-w-3xl">
    <h1 class="text-3xl font-bold text-slate-800 mb-8">আমার প্রোফাইল</h1>

    <div v-if="loadingProfile" class="card p-8 animate-pulse space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 rounded-full bg-slate-200" />
        <div class="space-y-2 flex-1">
          <div class="h-5 bg-slate-200 rounded w-1/3" />
          <div class="h-4 bg-slate-200 rounded w-1/4" />
        </div>
      </div>
    </div>

    <form v-else class="card p-8 space-y-6" @submit.prevent="save">
      <!-- Avatar area -->
      <div class="flex items-center gap-5">
        <div class="w-20 h-20 rounded-full bg-brand-100 text-brand-700 font-black text-2xl flex items-center justify-center flex-shrink-0">
          {{ (form.full_name || displayName).charAt(0).toUpperCase() }}
        </div>
        <div>
          <p class="font-semibold text-slate-700">{{ user?.email }}</p>
          <p class="text-xs text-slate-400 mt-0.5">যোগ দিয়েছেন {{ joinedDate }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="label">পুরো নাম</label>
          <input v-model="form.full_name" class="input" placeholder="আপনার নাম" />
        </div>
        <div>
          <label class="label">ইউজারনেম</label>
          <input v-model="form.username" class="input" placeholder="username" />
        </div>
      </div>

      <div>
        <label class="label">পরিচিতি (Bio)</label>
        <textarea v-model="form.bio" rows="3" class="input resize-none" placeholder="নিজের সম্পর্কে লিখুন..." />
      </div>

      <div>
        <label class="label">ওয়েবসাইট</label>
        <input v-model="form.website" type="url" class="input" placeholder="https://" />
      </div>

      <div class="flex items-center gap-3 pt-2">
        <button type="submit" class="btn-primary" :disabled="saving">
          <span v-if="saving" class="spinner" />
          <span v-else>সেভ করুন</span>
        </button>
        <p v-if="saved" class="text-green-600 text-sm font-semibold flex items-center gap-1">
          <Icon name="heroicons:check-circle" class="w-4 h-4" /> সেভ হয়েছে!
        </p>
      </div>
    </form>

    <!-- Quick links -->
    <div class="grid grid-cols-2 gap-4 mt-6">
      <NuxtLink to="/profile/resources" class="card p-5 flex items-center gap-3 hover:border-brand-300 transition group">
        <Icon name="heroicons:rectangle-stack" class="w-6 h-6 text-brand-500" />
        <div>
          <p class="font-semibold text-slate-700 group-hover:text-brand-600 transition">আমার রিসোর্স</p>
          <p class="text-xs text-slate-400 mt-0.5">শেয়ার করা রিসোর্সসমূহ</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/profile/saved" class="card p-5 flex items-center gap-3 hover:border-brand-300 transition group">
        <Icon name="heroicons:bookmark" class="w-6 h-6 text-brand-500" />
        <div>
          <p class="font-semibold text-slate-700 group-hover:text-brand-600 transition">সেভ করা</p>
          <p class="text-xs text-slate-400 mt-0.5">পরে পড়ার জন্য সেভ করা</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useSeoMeta({ title: 'আমার প্রোফাইল' })

const { user, displayName } = useAuth()
const { getProfile, updateProfile } = useProfile()
const toast = useToast()

const loadingProfile = ref(true)
const saving = ref(false)
const saved = ref(false)

const form = reactive({
  full_name: '',
  username: '',
  bio: '',
  website: '',
})

const joinedDate = computed(() =>
  user.value?.created_at
    ? new Date(user.value.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long' })
    : ''
)

onMounted(async () => {
  const profile = await getProfile()
  if (profile) {
    form.full_name = profile.full_name || ''
    form.username = profile.username || ''
    form.bio = profile.bio || ''
    form.website = profile.website || ''
  }
  loadingProfile.value = false
})

async function save() {
  saving.value = true
  saved.value = false
  try {
    await updateProfile({ ...form })
    saved.value = true
    toast.success('প্রোফাইল আপডেট হয়েছে!')
    setTimeout(() => (saved.value = false), 3000)
  } catch {
    toast.error('সমস্যা হয়েছে।')
  } finally {
    saving.value = false
  }
}
</script>
