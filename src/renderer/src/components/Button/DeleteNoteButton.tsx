import { LuTrash2 } from 'react-icons/lu'
import { ActionButton, ActionButtonTypes } from './ActionButton'

export const DeleteNoteButton = ({ ...props }: ActionButtonTypes) => {
  return (
    <ActionButton {...props}>
      <LuTrash2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
