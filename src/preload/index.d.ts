import { GetNotes } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
    }
  }
}
// below makes this is treated as a module, so we can access it from outside.
export {}
