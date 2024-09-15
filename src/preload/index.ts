import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language, //get language from user device
      getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
      readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
      writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
      createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
      deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
      toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
      system: () => ipcRenderer.invoke('dark-mode:system')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('context isolation must be enabled in the browser')
}
