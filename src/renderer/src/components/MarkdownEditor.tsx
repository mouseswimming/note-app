import {
  KitchenSinkToolbar,
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { selectedNote, editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor()

  // handleBlur - happens when user move the focus out of markdown editor
  if (!selectedNote) return null

  return (
    /* 
      we give a full-height wrapper, so as long as user click, the editor can get focus
    */
    <div className="h-full p-4" onClick={() => editorRef.current?.focus()}>
      {/* 
        The key is important here. Using the unique name and ts
        we can inform the editor to re-render when the selected note change.
      */}
      <MDXEditor
        className="h-full"
        ref={editorRef}
        key={selectedNote.filename}
        onChange={handleAutoSaving}
        onBlur={handleBlur}
        markdown={selectedNote?.content}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> })
        ]}
        contentEditableClassName="outline-none h-full max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-headings:text-black prose-p:text-black prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      />
    </div>
  )
}
