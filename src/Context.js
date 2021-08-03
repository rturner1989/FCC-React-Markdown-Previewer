import React, { useContext, useState, useEffect } from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import initialText from "./Markdown/Data.md";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [editorText, setEditorText] = useState("");
    const [previewMarkdown, setPreviewMarkdown] = useState("");

    const resizeWindow = () => {};

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
        marked.setOptions({ breaks: true });
        const importMarked = marked(editorText);
        const clean = DOMPurify.sanitize(importMarked, {
            USE_PROFILES: { html: true },
        });
        setPreviewMarkdown(clean);
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
