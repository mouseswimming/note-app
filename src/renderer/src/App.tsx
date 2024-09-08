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
        <Sidebar className="bg-slate-100 border-r border-slate-300 grid grid-rows-[auto_1fr]">
          <div className="app-region-drag flex justify-end items-center pr-2 h-12 border-b border-slate-300">
            <ActionButtonsRow className="flex gap-2" />
          </div>
          {/* <ActionButtonsRow className="flex justify-end gap-2 items-center pr-2 h-12 border-b border-slate-300" /> */}
          <NotePreviewList className=" space-y-1 bg-white" onSelect={resetScroll} />
        </Sidebar>
        <Content className="border-l bg-white border-l-white/20 grid grid-rows-[auto_1fr]">
          <FloatingNoteTitle className="p-2 h-12 border-b border-slate-300" />
          <div className="h-full overflow-y-auto relative" ref={contentContainerRef}>
            <MarkdownEditor />
          </div>
        </Content>
      </RootLayout>
    </>
  )
}

export default App
