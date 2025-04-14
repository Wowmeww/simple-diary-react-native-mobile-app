import React, { createContext, useState } from "react";

// Create the context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
    const [selected, setSelected] = useState(null); // Global state for selected entry
    const [isOptionOpen, setIsOptionOpen] = useState(false); // Global state for option menu visibility
    const [selectedForOption, setSelectedForOption] = useState(null);

    return (
        <GlobalContext.Provider value={{ selected, setSelected, isOptionOpen, setIsOptionOpen, selectedForOption, setSelectedForOption }} >
            {children}
        </GlobalContext.Provider>
    );
};