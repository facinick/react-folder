import { Atom, Code, Folder, FolderOpen, Hash, Music, Text } from 'lucide-react'
import { createContext, useContext, useMemo, useState } from 'react'
import './App.css'
import styles from './App.module.css'

enum FileExtension {
  CSS = 'css',
  TSX = 'tsx',
  HTML = 'html',
  MP3 = 'mp3'
}

enum FileSystemItemType {
  FILE,
  FOLDER
}

type File = {
  id: string
  name: string
  extension: string
  type: FileSystemItemType.FILE
}

type Folder = {
  id: string
  isRoot?: boolean
  name: string
  type: FileSystemItemType.FOLDER
  contents: Array<Folder | File>
}

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

function FileIcon({ extension }: { extension: string }) {

  switch (extension) {
    case FileExtension.CSS: {
      return <Hash />
    }
    case FileExtension.TSX: {
      return <Atom />
    }
    case FileExtension.HTML: {
      return <Code />
    }
    case FileExtension.MP3: {
      return <Music />
    }
    default: {
      return <Text />
    }
  }
}

function FolderIcon({ isOpen }: { isOpen: boolean }) {

  switch (isOpen) {
    case true: {
      return <FolderOpen />
    }
    case false: {
      return <Folder />
    }
  }
}

type FolderContextType = {
  openFolders: Set<string>;
  toggleFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  const value = useMemo(() => ({
    openFolders,
    toggleFolder
  }), [openFolders])

  return (
    <FolderContext.Provider value={value}>
      {children}
    </FolderContext.Provider>
  );
}

function FileView({ file }: { file: File }) {
  return (
    <div
      className={styles.folder_item}>
      <button id={file.id} className={styles.header}>
        <FileIcon extension={file.extension} />
        {file.name}
      </button>
    </div>
  )
}

function FolderView({ folder }: { folder: Folder }) {

  const { openFolders, toggleFolder } = useContext(FolderContext)!

  const isOpen = openFolders.has(folder.id)

  return (
    <div
      // role={folder.isRoot ? "tree" : "treeitem"}
      className={styles.folder_item}>
      <button
        className={styles.header}
        id={folder.id}
        onClick={() => toggleFolder(folder.id)}
      >
        <FolderIcon isOpen={isOpen} />
        {folder.name}
      </button>
      {
        isOpen &&
        <ul
          aria-labelledby={`folder-${folder.id}`}
          className={styles.contents}>
          {
            folder.contents.map((file_or_folder) => {
              return (
                <li key={file_or_folder.id}>
                  {
                    file_or_folder.type === FileSystemItemType.FILE &&
                    <FileView file={file_or_folder} />
                  }
                  {
                    file_or_folder.type === FileSystemItemType.FOLDER &&
                    <FolderView folder={file_or_folder} />
                  }
                </li>
              )
            })
          }
        </ul>
      }
    </div>
  )
}

function App() {

  return (
    <>
      <FolderProvider>
        <FolderView folder={root_folder} />
      </FolderProvider>
    </>
  )
}

export default App
