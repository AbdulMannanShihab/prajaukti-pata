export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()
  if (!user.value) {
    useState('authModalOpen').value = true
    return navigateTo('/')
  }
})
