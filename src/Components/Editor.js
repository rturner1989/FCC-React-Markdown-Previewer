import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../Context";
import { GiExpand, GiContract } from "react-icons/gi";
import { GoTrashcan } from "react-icons/go";

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
                <h1 id="editor-header">Editor</h1>
                <div className="btn-container">
                    <button className="clear" onClick={placeholder}>
                        <span className="label-hidden">Clear</span>
                        <GoTrashcan aria-hidden={true} focusable={false} />
                    </button>
                    {windowFullscreen === windowState.EDITOR ? (
                        <button className="contract" onClick={maximiseEditor}>
                            <span className="label-hidden">Contract</span>
                            <GiContract aria-hidden={true} focusable={false} />
                        </button>
                    ) : (
                        <button className="expand" onClick={maximiseEditor}>
                            <span className="label-hidden">Expand</span>
                            <GiExpand aria-hidden={true} focusable={false} />
                        </button>
                    )}
                </div>
            </div>
            <label htmlFor="editor" className="label-hidden">
                Markdown Editor
            </label>
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
