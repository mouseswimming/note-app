import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  /* 
    Auto saving fucntion
    using lodash throttling function to reduce the requency of writing code
  */
  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info('Auto saving: ', selectedNote.filename)
      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false, // init saving will not be triggerred
      trailing: true // last saving will always be triggerred
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    /* 
      cancel all not saved auto saving
      so we don't accidently overwrite the new selcted note with our content from previous note
    */
    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()
    if (content !== undefined) {
      await saveNote(content)
    }
  }

  return { selectedNote, handleAutoSaving, handleBlur, editorRef }
}
