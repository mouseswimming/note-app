import { deleteNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { LuTrash2 } from 'react-icons/lu'
import { ActionButton, ActionButtonTypes } from './ActionButton'

export const DeleteNoteButton = ({ ...props }: ActionButtonTypes) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <ActionButton {...props} onClick={handleDelete}>
      <LuTrash2 className="w-4 h-4" />
    </ActionButton>
  )
}
