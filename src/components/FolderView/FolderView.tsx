import { Atom, Code, Folder as FolderClosedIcon, FolderOpen, Hash, Music, Plus, Text } from 'lucide-react'
import { ComponentProps, useContext, useState } from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
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
        >
            <Button
                variant={'link'}
                id={file.id}
                className='flex gap-2'
            >
                <FileIcon className="h-4 w-4" extension={file.extension} />
                <span>{file.name}</span>
            </Button>
        </div>
    )
}

function FolderView({ folder }: { folder: Folder }) {

    const { openFolders, toggleFolder } = useContext(FolderContext)!
    const [showAddButton, setShowAddButton] = useState(false)

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
    }

    return (
        <div
            className='text-left'
        >
            <div
                onMouseEnter={() => setShowAddButton(true)}
                onMouseLeave={() => setShowAddButton(false)}
                className='flex items-center '
            >
                <Button
                    variant={'link'}
                    id={folder.id}
                    onClick={() => toggleFolder(folder.id)}
                    onKeyDown={handleKeyDown}
                    className='flex gap-2'
                >
                    <FolderIcon className="h-4 w-4" isOpen={isOpen} />
                    <span>{folder.name}</span>
                </Button>
                {isOpen && <AddNew />}
            </div>
            {
                isOpen &&
                <ul
                    className="ml-4 flex flex-col"
                >
                    {
                        folder.contents.map((file_or_folder) => {
                            return (
                                <li className='inline-block' key={file_or_folder.id}>
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
            {
                isOpen && folder.contents.length === 0 &&
                <p>Folder is empty</p>
            }
        </div>
    )
}

function AddNew() {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Plus className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => { }}>
                    Add File
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { }}>
                    Add Folder
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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

