import { appDirectoryName, fileEncoding, welcomeFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
// so vite know it is a static asset file
import welcomeFile from '../../../resources/welcometNote.md?asset'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  // we need to make sure the folder exist
  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  // we only need markdown file, which ends with .md
  const notes = notesFileNames.filter((filename) => filename.endsWith('.md'))

  // when user hasn't created any note, we will load the welcome and create that note for user
  if (isEmpty(notes)) {
    const content = await readFile(welcomeFile, { encoding: fileEncoding })

    await writeFile(`${rootDir}/${welcomeFilename}`, content, { encoding: fileEncoding })
    notes.push(welcomeFilename)
  }

  // we will loop through all notes and get related note info
  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    filename: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  // use dialouge from electron, allow user to input their filer name

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    // in case user create a file with same name, we wil inform user that the content will be overwritten
    properties: ['showHiddenFiles'],
    showsTagField: false,
    // we only allow user to create markdown file
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) return false

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: 'All notes must be saved in its default folder. Avoid using different directories!'
    })

    return false
  }

  // we get a valid filename in right directory, let's create an empty note
  await writeFile(filePath, '')
  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note?',
    message: `Are you sure you want to delete ${filename}?`,
    // the button will have id assigned based on below listed order
    // delete - 0, cancel - 1
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  // delete is aborted
  if (response === 1) return false

  await remove(`${rootDir}/${filename}.md`)
  return true
}
