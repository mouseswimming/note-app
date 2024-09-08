import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
    }
  }
}
// below makes this is treated as a module, so we can access it from outside.
export {}
