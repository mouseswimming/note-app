import { GetNotes } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language, //get language from user device
      getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('context isolation must be enabled in the browser')
}
