import { createContext, useMemo, useState } from "react";

type FolderContextType = {
    openFolders: Set<string>;
    toggleFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextType | undefined>(undefined);

function FolderProvider({ children }: { children: React.ReactNode }) {
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

export {
    FolderContext, FolderProvider
};
export type { FolderContextType };

