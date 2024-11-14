import React, { createContext, useState } from 'react';

export const reloadContext = createContext();

export function ReloadPageProvider({ children }) {
    const [reload, setReload] = useState(false);

    return (
        <reloadContext.Provider value={[reload, setReload]}>
            {children}
        </reloadContext.Provider>
    );
}
