import React from "react";
import { useGlobalContext } from "../Context";

const Preview = () => {
    const { previewMarkdown } = useGlobalContext();

    return (
        <section className="markdown-previewer">
            <div id="preview-navbar">
                <h1>Preview</h1>
                <button>Resize</button>
            </div>
            <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: previewMarkdown }}
            />
        </section>
    );
};

export default Preview;
