import React from "react";
import { useGlobalContext } from "../Context";

const Preview = () => {
    const { previewMarkdown } = useGlobalContext();

    return (
        <section>
            <label htmlFor="preview">
                <textarea name="preview" id="preview" value={previewMarkdown} />
            </label>
        </section>
    );
};

export default Preview;
