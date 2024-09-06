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
      name: 'home',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_0_0',
          name: 'user',
          type: FileSystemItemType.FOLDER,
          contents: [
            {
              id: '0_0_0_0',
              name: 'documents',
              type: FileSystemItemType.FOLDER,
              contents: [
                {
                  id: '0_0_0_0_0',
                  name: 'resume.pdf',
                  type: FileSystemItemType.FILE,
                  extension: 'pdf',
                },
                {
                  id: '0_0_0_0_1',
                  name: 'report.docx',
                  type: FileSystemItemType.FILE,
                  extension: 'docx',
                }
              ]
            },
            {
              id: '0_0_0_1',
              name: 'photos',
              type: FileSystemItemType.FOLDER,
              contents: [
                {
                  id: '0_0_0_1_0',
                  name: 'vacation.jpg',
                  type: FileSystemItemType.FILE,
                  extension: 'jpg',
                },
                {
                  id: '0_0_0_1_1',
                  name: 'profile.png',
                  type: FileSystemItemType.FILE,
                  extension: 'png',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '0_1',
      name: 'var',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_1_0',
          name: 'log',
          type: FileSystemItemType.FOLDER,
          contents: [
            {
              id: '0_1_0_0',
              name: 'syslog',
              type: FileSystemItemType.FILE,
              extension: 'log',
            }
          ]
        },
        {
          id: '0_1_1',
          name: 'www',
          type: FileSystemItemType.FOLDER,
          contents: [
            {
              id: '0_1_1_0',
              name: 'index.html',
              type: FileSystemItemType.FILE,
              extension: 'html',
            },
            {
              id: '0_1_1_1',
              name: 'about.html',
              type: FileSystemItemType.FILE,
              extension: 'html',
            }
          ]
        }
      ]
    },
    {
      id: '0_2',
      name: 'etc',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_2_0',
          name: 'nginx',
          type: FileSystemItemType.FOLDER,
          contents: [
            {
              id: '0_2_0_0',
              name: 'nginx.conf',
              type: FileSystemItemType.FILE,
              extension: 'conf',
            }
          ]
        },
        {
          id: '0_2_1',
          name: 'fstab',
          type: FileSystemItemType.FILE,
          extension: 'fstab',
        }
      ]
    },
    {
      id: '0_3',
      name: 'usr',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_3_0',
          name: 'local',
          type: FileSystemItemType.FOLDER,
          contents: [
            {
              id: '0_3_0_0',
              name: 'bin',
              type: FileSystemItemType.FOLDER,
              contents: [
                {
                  id: '0_3_0_0_0',
                  name: 'program',
                  type: FileSystemItemType.FILE,
                  extension: 'bin',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '0_4',
      name: 'tmp',
      type: FileSystemItemType.FOLDER,
      contents: [
        {
          id: '0_4_0',
          name: 'tempfile.txt',
          type: FileSystemItemType.FILE,
          extension: 'txt',
        }
      ]
    },
    {
      id: '0_5',
      name: 'src',
      type: FileSystemItemType.FOLDER,
      contents: []
    }
  ]
}

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <header className='flex justify-center gap-4 items-center'>
          <h1 className="text-2xl font-bold">File Explorer</h1>
          <ModeToggle />
        </header>
        <Folder data={root_folder} />
      </ThemeProvider>
    </>
  )
}

export default App
