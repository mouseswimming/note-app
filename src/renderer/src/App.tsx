import {
  Content,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'
import { ActionButtonsRow } from './components/ActionButtonsRow'
import DraggableTopBar from './components/DraggableTopBar'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTo(0, 0)
    }
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="text-black dark:text-white border-r border-slate-300 dark:border-slate-700 grid grid-rows-[auto_1fr]">
          <div className="app-region-drag flex justify-end items-center pr-2 h-12 border-b border-slate-300 dark:border-slate-700">
            <ActionButtonsRow className="flex gap-2" />
          </div>
          <NotePreviewList className="p-2 space-y-1 dark:text-white" onSelect={resetScroll} />
        </Sidebar>
        <Content className=" dark:text-white  grid grid-rows-[auto_1fr]">
          <FloatingNoteTitle className="p-2 h-12 border-b border-slate-300 dark:border-slate-700" />
          <div className="h-full overflow-y-auto relative" ref={contentContainerRef}>
            <MarkdownEditor />
          </div>
        </Content>
      </RootLayout>
    </>
  )
}

export default App
