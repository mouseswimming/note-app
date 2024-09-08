import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort the notes by most recent editor
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

// notesAtomAsync is aync, and we need to use unwrapper function from jotai to assign it to sync notesAtom
const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev || [])

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  // if (selectedNoteIndex == null || !notes) return null
  if (selectedNoteIndex == null) return null

  const selectedNote = notes[selectedNoteIndex]

  return { ...selectedNote, content: `Hello from Note${selectedNoteIndex}` }
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  // if (!notes) return

  const newNote: NoteInfo = {
    title: `Note ${notes.length + 1}`,
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes])
  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  // if (selectedNoteIndex === null || !notes) return
  if (selectedNoteIndex === null) return

  set(
    notesAtom,
    notes.filter((_, i) => i !== selectedNoteIndex)
  )

  set(selectedNoteIndexAtom, null)
})
