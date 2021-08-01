import React from "react";
import { useGlobalContext } from "../Context";

const Editor = () => {
    const { editorText, setEditorText } = useGlobalContext();
    return (
        <section>
            <label htmlFor="editor">
                <textarea
                    name="editor"
                    id="editor"
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                />
            </label>
        </section>
    );
};

export default Editor;
