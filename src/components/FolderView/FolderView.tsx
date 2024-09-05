import { Atom, Code, Folder as FolderClosedIcon, FolderOpen, Hash, Music, Text } from 'lucide-react'
import { useContext } from 'react'
import styles from './FolderView.module.css'
import { FolderContext, FolderProvider } from './context'

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
            return <FolderClosedIcon />
        }
    }
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

function Folder({ data }: { data: Folder }) {

    return (
        <FolderProvider>
            <FolderView folder={data} />
        </FolderProvider>
    )
}

export {
    FileSystemItemType, Folder
}

