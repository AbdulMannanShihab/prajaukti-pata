type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: number
  message: string
  type: ToastType
}

let counter = 0

export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])

  function show(message: string, type: ToastType = 'success', duration = 3000) {
    const id = ++counter
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  const success = (msg: string) => show(msg, 'success')
  const error   = (msg: string) => show(msg, 'error', 4000)
  const info    = (msg: string) => show(msg, 'info')
  const warning = (msg: string) => show(msg, 'warning')

  return { toasts, show, success, error, info, warning }
}