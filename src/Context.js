import React, { useContext, useState, useEffect } from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import initialText from "./Markdown/Data.md";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const windowState = { EDITOR: "EDITOR", PREVIEW: "PREVIEW", NONE: "NONE" };
    const [editorText, setEditorText] = useState("");
    const [previewMarkdown, setPreviewMarkdown] = useState("");
    const [windowFullscreen, setWindowFullscreen] = useState(windowState.NONE);
    const [editorPlaceHolder, setEditorPlaceHolder] = useState("");

    const fetchInitialText = async () => {
        const response = await fetch(initialText);
        const data = await response.text();
        setEditorText(data);
    };

    const placeholder = () => {
        setEditorPlaceHolder(editorText);
        setEditorText("");
    };

    const maximiseEditor = () => {
        switch (windowFullscreen) {
            case windowState.EDITOR:
                setWindowFullscreen(windowState.NONE);
                break;
            case windowState.PREVIEW:
                setWindowFullscreen(windowState.EDITOR);
                break;
            case windowState.NONE:
                setWindowFullscreen(windowState.EDITOR);
                break;
        }
    };
    const maximisePreview = () => {
        switch (windowFullscreen) {
            case windowState.EDITOR:
                setWindowFullscreen(windowState.PREVIEW);
                break;
            case windowState.PREVIEW:
                setWindowFullscreen(windowState.NONE);
                break;
            case windowState.NONE:
                setWindowFullscreen(windowState.PREVIEW);
                break;
        }
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
                windowState,
                editorText,
                previewMarkdown,
                windowFullscreen,
                editorPlaceHolder,
                setEditorText,
                setPreviewMarkdown,
                updatePreviewText,
                setWindowFullscreen,
                maximiseEditor,
                maximisePreview,
                placeholder,
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
