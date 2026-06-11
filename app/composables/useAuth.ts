export function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const toast = useToast()

  const loading = ref(false)

  async function signUp(email: string, password: string, fullName: string) {
    loading.value = true
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${useRequestURL().origin}/auth/confirm`,
        },
      })
      if (error) throw error
      toast.success('অ্যাকাউন্ট তৈরি হয়েছে! ইমেইল যাচাই করুন।')
      return true
    } catch (e: any) {
      const msg = e.message?.includes('already')
        ? 'এই ইমেইলে আগেই অ্যাকাউন্ট আছে।'
        : 'সমস্যা হয়েছে। আবার চেষ্টা করুন।'
      toast.error(msg)
      return false
    } finally {
      loading.value = false
    }
  }

  async function signIn(email: string, password: string) {
    loading.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast.success('সফলভাবে সাইন ইন হয়েছে!')
      return true
    } catch {
      toast.error('ইমেইল বা পাসওয়ার্ড ভুল।')
      return false
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    toast.info('সাইন আউট সম্পন্ন।')
    await navigateTo('/')
  }

  async function resetPassword(email: string) {
    loading.value = true
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${useRequestURL().origin}/auth/update-password`,
      })
      if (error) throw error
      toast.success('পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে!')
      return true
    } catch {
      toast.error('সমস্যা হয়েছে। আবার চেষ্টা করুন।')
      return false
    } finally {
      loading.value = false
    }
  }

  const isLoggedIn = computed(() => !!user.value)
  const displayName = computed(
    () => user.value?.user_metadata?.full_name || user.value?.email?.split('@')[0] || 'ব্যবহারকারী'
  )
  const avatarInitial = computed(() => displayName.value.charAt(0).toUpperCase())

  return { user, loading, isLoggedIn, displayName, avatarInitial, signUp, signIn, signOut, resetPassword }
}
