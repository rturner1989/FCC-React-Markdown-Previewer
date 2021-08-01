import React, { useContext, useState, useEffect } from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import initialText from "./Markdown/Data.md";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [editorText, setEditorText] = useState("");
    const [previewMarkdown, setPreviewMarkdown] = useState("");

    const fetchInitialText = async () => {
        const response = await fetch(initialText);
        const data = await response.text();
        setEditorText(data);
    };

    useEffect(() => {
        fetchInitialText();
    }, []);

    useEffect(() => {
        updatePreviewText();
    }, [editorText]);

    const updatePreviewText = () => {
        // marked.setOptions({ break: false });
        const importMarked = marked(editorText);
        const purified = DOMPurify.sanitize(importMarked);
        setPreviewMarkdown(purified);
    };

    return (
        <AppContext.Provider
            value={{
                editorText,
                previewMarkdown,
                setEditorText,
                setPreviewMarkdown,
                updatePreviewText,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
export const useGlobalContext = () => {
    return useContext(AppContext);
};
