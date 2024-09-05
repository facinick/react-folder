import { createContext, useMemo, useState } from "react";

type FolderContextType = {
    openFolders: Set<string>;
    toggleFolder: (id: string) => void;
};

type FileContextType = {
    showHiddenFiles: boolean;
    toggleShowHiddenFiles: () => void;
};

const FolderContext = createContext<FolderContextType | undefined>(undefined);

const FileContext = createContext<FileContextType | undefined>(undefined);

function FolderProvider({ children }: { children: React.ReactNode }) {
    const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
    const [showHiddenFiles, setShowHiddenFiles] = useState<boolean>(true);

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

    const toggleShowHiddenFiles = () => {
        setShowHiddenFiles(prev => {
            return !prev;
        });
    }

    const folderContextValue = useMemo(() => ({
        openFolders,
        toggleFolder
    }), [openFolders])

    const fileContextValue = useMemo(() => ({
        showHiddenFiles,
        toggleShowHiddenFiles
    }), [showHiddenFiles])

    return (
        <FolderContext.Provider value={folderContextValue}>
            <FileContext.Provider value={fileContextValue}>
                {children}
            </FileContext.Provider>
        </FolderContext.Provider>
    );
}

export {
    FolderContext, FolderProvider
};
export type { FolderContextType };

