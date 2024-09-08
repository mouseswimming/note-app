import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { LuFileSignature } from 'react-icons/lu'
import { ActionButton, ActionButtonTypes } from './ActionButton'

export const NewNoteButton = ({ ...props }: ActionButtonTypes) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton {...props} onClick={handleCreation}>
      <LuFileSignature className="w-4 h-4" />
    </ActionButton>
  )
}
