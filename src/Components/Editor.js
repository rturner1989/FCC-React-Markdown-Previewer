import React from "react";
import { useGlobalContext } from "../Context";

const Editor = () => {
    const { editorText, setEditorText } = useGlobalContext();
    return (
        <section className="markdown-editor">
            {/* <label className="markdown-editor-label" htmlFor="editor">
                Markdown Editor
            </label> */}
            <div id="editor-navbar">
                <h1>Editor</h1>
                <div className="btn-container">
                    <button>Clear</button>
                    <button>Resize</button>
                </div>
            </div>
            <textarea
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
