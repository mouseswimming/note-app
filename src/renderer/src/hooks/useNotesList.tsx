import { notesAtom, selectedNoteIndexAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'

export const useNoteList = ({ onSelect }: { onSelect?: () => void }) => {
  // useAtomValue - read the value for atom without intersted in its state function
  const notes = useAtomValue(notesAtom)

  // useAtom - get and set selectedNoteIndex value
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = async (index: number) => {
    setSelectedNoteIndex(index)

    if (onSelect) onSelect()
  }

  return { notes, selectedNoteIndex, handleNoteSelect }
}
