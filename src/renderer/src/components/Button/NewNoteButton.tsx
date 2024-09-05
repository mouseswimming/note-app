import { LuFileSignature } from 'react-icons/lu'
import { ActionButton, ActionButtonTypes } from './ActionButton'

export const NewNoteButton = ({ ...props }: ActionButtonTypes) => {
  return (
    <ActionButton {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
