import { deleteNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { LuTrash2 } from 'react-icons/lu'
import { ActionButton, ActionButtonTypes } from './ActionButton'

export const DeleteNoteButton = ({ ...props }: ActionButtonTypes) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  return (
    <ActionButton {...props} onClick={deleteNote}>
      <LuTrash2 className="w-4 h-4" />
    </ActionButton>
  )
}
