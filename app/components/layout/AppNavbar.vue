<template>
  <nav class="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
    <div class="container mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">

      <!-- Logo -->
      <NuxtLink to="/" class="flex-shrink-0 text-xl font-black text-brand-700 tracking-tight leading-none">
        প্রযুক্তি<span class="text-slate-400">.পাতা</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600">
        <NuxtLink to="/" class="nav-link" exact-active-class="nav-link-active">হোম</NuxtLink>
        <NuxtLink to="/learning" class="nav-link" active-class="nav-link-active">লার্নিং</NuxtLink>
        <NuxtLink to="/channels" class="nav-link" active-class="nav-link-active">চ্যানেল</NuxtLink>
        <NuxtLink to="/blogs" class="nav-link" active-class="nav-link-active">ব্লগ</NuxtLink>
      </div>

      <!-- Search -->
      <div class="hidden md:flex flex-1 max-w-xs">
        <div class="relative w-full">
          <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="রিসোর্স খুঁজুন..."
            class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm
                   focus:outline-none focus:border-brand-400 focus:bg-white transition-all"
            @keyup.enter="goSearch"
          />
        </div>
      </div>

      <!-- Right: Auth -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <!-- Upload button (logged in) -->
        <button
          v-if="isLoggedIn"
          class="btn-primary text-sm py-2 px-4 hidden md:inline-flex"
          @click="openUploadModal"
        >
          <Icon name="heroicons:plus" class="w-4 h-4" />
          রিসোর্স যোগ করুন
        </button>

        <!-- Avatar dropdown (logged in) -->
        <div v-if="isLoggedIn" class="relative" ref="dropdownRef">
          <button
            class="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold text-sm
                   flex items-center justify-center hover:bg-brand-200 transition"
            @click="dropdownOpen = !dropdownOpen"
          >
            {{ avatarInitial }}
          </button>
          <Transition name="fade">
            <div
              v-if="dropdownOpen"
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-slate-200
                     shadow-xl py-2 z-50 animate-slide-up"
            >
              <p class="px-4 py-1.5 text-xs text-slate-400 font-semibold truncate border-b border-slate-100 mb-1">
                {{ displayName }}
              </p>
              <NuxtLink to="/profile" class="dropdown-item" @click="dropdownOpen = false">
                <Icon name="heroicons:user" class="w-4 h-4" /> প্রোফাইল
              </NuxtLink>
              <NuxtLink to="/profile/resources" class="dropdown-item" @click="dropdownOpen = false">
                <Icon name="heroicons:rectangle-stack" class="w-4 h-4" /> আমার রিসোর্স
              </NuxtLink>
              <NuxtLink to="/profile/saved" class="dropdown-item" @click="dropdownOpen = false">
                <Icon name="heroicons:bookmark" class="w-4 h-4" /> সেভ করা
              </NuxtLink>
              <div class="border-t border-slate-100 mt-1 pt-1">
                <button class="dropdown-item text-red-600 w-full" @click="handleSignOut">
                  <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4" /> সাইন আউট
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Sign in button (logged out) -->
        <button v-else class="btn-primary text-sm py-2 px-4" @click="openAuthModal">
          সাইন ইন
        </button>

        <!-- Mobile menu toggle -->
        <button class="md:hidden btn-ghost p-2" @click="mobileOpen = !mobileOpen">
          <Icon :name="mobileOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="fade">
      <div v-if="mobileOpen" class="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
        <NuxtLink to="/" class="mobile-nav-link" @click="mobileOpen = false">হোম</NuxtLink>
        <NuxtLink to="/resources" class="mobile-nav-link" @click="mobileOpen = false">রিসোর্স</NuxtLink>
        <NuxtLink to="/learning" class="mobile-nav-link" @click="mobileOpen = false">লার্নিং</NuxtLink>
        <NuxtLink to="/channels" class="mobile-nav-link" @click="mobileOpen = false">চ্যানেল</NuxtLink>
        <NuxtLink to="/blogs" class="mobile-nav-link" @click="mobileOpen = false">ব্লগ</NuxtLink>
        <div class="pt-3 border-t border-slate-100">
          <div class="relative mb-3">
            <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input v-model="searchQuery" type="text" placeholder="রিসোর্স খুঁজুন..."
              class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-400 transition"
              @keyup.enter="goSearch" />
          </div>
          <button v-if="isLoggedIn" class="btn-primary w-full mb-2" @click="openUploadModal; mobileOpen = false">
            <Icon name="heroicons:plus" class="w-4 h-4" /> রিসোর্স যোগ করুন
          </button>
          <button v-else class="btn-primary w-full" @click="openAuthModal; mobileOpen = false">সাইন ইন</button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const { isLoggedIn, displayName, avatarInitial, signOut } = useAuth()

const searchQuery = ref('')
const dropdownOpen = ref(false)
const mobileOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => { dropdownOpen.value = false })

const router = useRouter()
function goSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/resources', query: { q: searchQuery.value.trim() } })
    mobileOpen.value = false
  }
}

// Modal events via useState
const authModalOpen = useState('authModalOpen', () => false)
const uploadModalOpen = useState('uploadModalOpen', () => false)

function openAuthModal() { authModalOpen.value = true }
async function openUploadModal() {
  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { authModalOpen.value = true; return }
  uploadModalOpen.value = true
}

async function handleSignOut() {
  dropdownOpen.value = false
  await signOut()
}
</script>

<style scoped>
.nav-link {
  @apply px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors;
}
.nav-link-active {
  @apply bg-brand-50 text-brand-700;
}
.dropdown-item {
  @apply flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700
         hover:bg-slate-50 transition-colors cursor-pointer;
}
.mobile-nav-link {
  @apply block px-3 py-2.5 rounded-xl text-slate-700 font-semibold hover:bg-slate-100 transition-colors;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>