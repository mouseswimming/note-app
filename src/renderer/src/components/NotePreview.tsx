import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  filename,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-gray-200/50': isActive,
          'hover:bg-gray-300/50': !isActive
        },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate">{filename}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">
        {formatDateFromMs(lastEditTime)}
      </span>
    </div>
  )
}
