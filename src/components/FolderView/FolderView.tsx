import { Atom, Code, Folder as FolderClosedIcon, FolderOpen, Hash, Music, Text } from 'lucide-react'
import { ComponentProps, useContext } from 'react'
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

function FileIcon({ extension, ...rest }: { extension: string } & ComponentProps<typeof Hash>) {

    switch (extension) {
        case FileExtension.CSS: {
            return <Hash {...rest} />
        }
        case FileExtension.TSX: {
            return <Atom {...rest} />
        }
        case FileExtension.HTML: {
            return <Code {...rest} />
        }
        case FileExtension.MP3: {
            return <Music {...rest} />
        }
        default: {
            return <Text {...rest} />
        }
    }
}

function FolderIcon({ isOpen, ...rest }: { isOpen: boolean } & ComponentProps<typeof FolderOpen>) {

    switch (isOpen) {
        case true: {
            return <FolderOpen {...rest} />
        }
        case false: {
            return <FolderClosedIcon {...rest} />
        }
    }
}

function FileView({ file }: { file: File }) {
    return (
        <div
            className={styles.folder_item}>
            <button
                className={styles.header}
                id={file.id}
            >
                <FileIcon className={styles.icon} extension={file.extension} />
                {file.name}
            </button>
        </div>
    )
}

function FolderView({ folder }: { folder: Folder }) {

    const { openFolders, toggleFolder } = useContext(FolderContext)!

    const isOpen = openFolders.has(folder.id)

    const handleKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowRight':
                if (!isOpen) toggleFolder(folder.id);
                break;
            case 'ArrowLeft':
                if (isOpen) toggleFolder(folder.id);
                break;
        }
    };

    return (
        <div
            // role={folder.isRoot ? "tree" : "treeitem"}
            className={styles.folder_item}>
            <button
                className={styles.header}
                id={folder.id}
                onClick={() => toggleFolder(folder.id)}
                onKeyDown={handleKeyDown}
            >
                <FolderIcon className={styles.icon} isOpen={isOpen} />
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

