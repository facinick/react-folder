import './App.css'
import { FileSystemItemType, Folder } from './components/FolderView/FolderView'
import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from './components/theme-provider'

const root_folder: Folder = {
  id: '0',
  name: 'root',
  isRoot: true,
  type: FileSystemItemType.FOLDER,
  contents: [
    {
      id: '0_0',
      name: 'songs',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_0_0',
          name: 'old',
          type: FileSystemItemType.FOLDER,
          contents: [
            {
              id: '0_0_0_0',
              name: 'sunny.mp3',
              extension: "mp3",
              type: FileSystemItemType.FILE,
            },
            {
              id: '0_0_0_1',
              name: 'rasputtin.mp3',
              extension: "mp3",
              type: FileSystemItemType.FILE,
            }
          ]
        },
        {
          id: '0_0_1',
          name: 'new',
          type: FileSystemItemType.FOLDER,
          contents: [
            {
              id: '0_0_1_0',
              name: 'rock',
              type: FileSystemItemType.FOLDER,
              contents: [
                {
                  id: '0_0_1_0_0',
                  name: 'rock&roll.mp3',
                  extension: "mp3",
                  type: FileSystemItemType.FILE,
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '0_1',
      name: 'todo.MD',
      extension: 'MD',
      type: FileSystemItemType.FILE,
    },
    {
      id: '0_2',
      name: 'documents',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_2_0',
          name: 'certificate.docx',
          extension: 'docx',
          type: FileSystemItemType.FILE,
        },
        {
          id: '0_2_1',
          name: '.pem',
          extension: 'pem',
          type: FileSystemItemType.FILE,
        },
        {
          id: '0_2_2',
          name: 'names.json',
          extension: 'json',
          type: FileSystemItemType.FILE,
        }
      ]
    },
    {
      id: '0_3',
      name: 'code',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_3_0',
          name: 'index.html',
          type: FileSystemItemType.FILE,
          extension: 'html'
        },
        {
          id: '0_3_1',
          name: 'main.tsx',
          type: FileSystemItemType.FILE,
          extension: 'tsx'
        }
      ]
    }
  ]
}

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
        <Folder data={root_folder} />
      </ThemeProvider>
    </>
  )
}

export default App
