import { NoteContent, NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort the notes by most recent editor
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

// notesAtomAsync is aync, and we need to use unwrapper function from jotai to assign it to sync notesAtom
const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev ?? [])

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  // if (selectedNoteIndex == null || !notes) return null
  if (selectedNoteIndex == null) return null

  const selectedNote = notes[selectedNoteIndex]

  const noteContent = await window.context.readNote(selectedNote.filename)

  return { ...selectedNote, content: noteContent }
})

/* 
  Since the selectedNoteAtom can be null, we will provide a default empty note
*/
export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) => prev ?? { filename: '', content: '', lastEditTime: Date.now() }
)

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  const filename = await window.context.createNote()

  if (!filename) return

  const newNote: NoteInfo = {
    filename,
    lastEditTime: Date.now()
  }
  /* 
    the reason we do here is to handle the overwriting case.
    if user decide to overwite the prevous note, we need to filter the old one out
    ...notes.filter((note) => note.filename !== filename)
  */
  set(notesAtom, [newNote, ...notes.filter((note) => note.filename !== filename)])
  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (selectedNote === null) return
  const response = await window.context.deleteNote(selectedNote.filename)

  if (!response) return

  set(
    notesAtom,
    notes.filter((note) => note.filename !== selectedNote.filename)
  )

  set(selectedNoteIndexAtom, null)
})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  // if (!selectedNote || !notes) return
  if (!selectedNote) return

  // save note content
  await window.context.writeNote(selectedNote.filename, newContent)

  // update note last edit time
  set(
    notesAtom,
    notes.map((note) => {
      if (note.filename === selectedNote.filename) {
        return { ...note, lastEditTime: Date.now() }
      }

      return note
    })
  )
})
