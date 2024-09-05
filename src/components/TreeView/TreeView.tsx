enum FileSystemItemType {
    FILE,
    FOLDER
}

type File = {
    name: string
    type: FileSystemItemType.FILE
}

type Folder = {
    name: string
    type: FileSystemItemType.FOLDER
    contents: Array<Folder | File>
}

const file_system: Array<Folder | File> = [
    {
        name: 'songs',
        type: FileSystemItemType.FOLDER,
        contents: [
            {
                name: 'old',
                type: FileSystemItemType.FOLDER,
                contents: [
                    {
                        name: 'sunny.mp3',
                        type: FileSystemItemType.FILE,
                    },
                    {
                        name: 'rasputtin.mp3',
                        type: FileSystemItemType.FILE,
                    }
                ]
            },
            {
                name: 'new',
                type: FileSystemItemType.FOLDER,
                contents: [
                    {
                        name: 'rock',
                        type: FileSystemItemType.FOLDER,
                        contents: [
                            {
                                name: 'rock&roll.mp3',
                                type: FileSystemItemType.FILE,
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'todo.MD',
        type: FileSystemItemType.FILE,
    },
    {
        name: 'documents',
        type: FileSystemItemType.FOLDER,
        contents: [
            {
                name: 'certificate.docx',
                type: FileSystemItemType.FILE,
            },
            {
                name: '.pem',
                type: FileSystemItemType.FILE,
            },
            {
                name: 'names.json',
                type: FileSystemItemType.FILE,
            }
        ]
    }
]

function TreeFile({ file }: { file: File }) {
    return (
        <>{file.name}</>
    )
}

function TreeFolder({ folder }: { folder: Folder }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {
                folder.name
            }
            {
                folder.contents.map((file_or_folder) => {
                    return (
                        file_or_folder.type === FileSystemItemType.FILE
                            ?
                            <TreeFile file={file_or_folder} />
                            :
                            <TreeFolder folder={file_or_folder} />
                    )
                })
            }
        </>
    )
}

function TreeView({ root }: { root: Array<Folder | File> }) {

    return (
        <>
            {
                root.map((file_or_folder) => {
                    return (
                        file_or_folder.type === FileSystemItemType.FILE
                            ?
                            <TreeFile file={file_or_folder} />
                            :
                            <TreeFolder folder={file_or_folder} />
                    )
                })
            }
        </>
    )
}