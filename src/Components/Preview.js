import React from "react";
import { useGlobalContext } from "../Context";

const Preview = () => {
    const { previewMarkdown } = useGlobalContext();

    return (
        <section>
            <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: previewMarkdown }}
            />
        </section>
    );
};

export default Preview;
