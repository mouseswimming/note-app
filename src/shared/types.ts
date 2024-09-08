import { NoteContent, NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (fileName: string) => Promise<NoteContent>
export type WriteNote = (fileName: string, content: NoteContent) => Promise<void>

// the note create can be aborted. in that case, false will be returned
export type CreateNote = () => Promise<NoteInfo['filename'] | false>
export type DeleteNote = (filename: string) => Promise<boolean>
