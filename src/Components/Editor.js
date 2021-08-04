import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../Context";

const Editor = () => {
    const {
        editorText,
        maximiseEditor,
        windowState,
        windowFullscreen,
        placeholder,
        editorPlaceHolder,
        setEditorText,
    } = useGlobalContext();

    const editorRef = useRef(null);

    useEffect(() => {
        switch (windowFullscreen) {
            case windowState.EDITOR:
                editorRef.current.classList.add("window-max");
                editorRef.current.classList.remove("window-hidden");
                break;
            case windowState.PREVIEW:
                editorRef.current.classList.add("window-hidden");
                editorRef.current.classList.remove("window-max");
                break;
            case windowState.NONE:
                editorRef.current.classList.remove("window-max");
                editorRef.current.classList.remove("window-hidden");
                break;
        }
    }, [windowFullscreen]);

    return (
        <section className="markdown-editor" ref={editorRef}>
            <div id="editor-navbar">
                <h1>Editor</h1>
                <div className="btn-container">
                    <button onClick={placeholder}>Clear</button>
                    <button onClick={maximiseEditor}>Resize</button>
                </div>
            </div>
            <textarea
                placeholder={editorPlaceHolder}
                name="editor"
                id="editor"
                autoFocus={true}
                value={editorText}
                onChange={(e) => setEditorText(e.target.value)}
            />
        </section>
    );
};

export default Editor;
