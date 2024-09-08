import { useNoteList } from '@renderer/hooks/useNotesList'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './NotePreview'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNoteList({ onSelect })

  if (isEmpty(notes)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        No Notes Yet!
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.filename}
          isActive={index === selectedNoteIndex}
          onClick={() => handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
