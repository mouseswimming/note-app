import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return (
    <div className={twMerge('flex justify-center items-center', className)} {...props}>
      <span>{selectedNote?.filename}</span>
    </div>
  )
}
