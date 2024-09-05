import { contextBridge } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language //get language from user device
    })
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('context isolation must be enabled in the browser')
}
