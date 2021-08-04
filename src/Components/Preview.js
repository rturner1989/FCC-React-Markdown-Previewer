import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../Context";
import { GiExpand, GiContract } from "react-icons/gi";

const Preview = () => {
    const { previewMarkdown, maximisePreview, windowState, windowFullscreen } =
        useGlobalContext();

    const previewRef = useRef(null);

    useEffect(() => {
        switch (windowFullscreen) {
            case windowState.EDITOR:
                previewRef.current.classList.add("window-hidden");
                previewRef.current.classList.remove("window-max");
                break;
            case windowState.PREVIEW:
                previewRef.current.classList.add("window-max");
                previewRef.current.classList.remove("window-hidden");
                break;
            case windowState.NONE:
                previewRef.current.classList.remove("window-max");
                previewRef.current.classList.remove("window-hidden");
                break;
        }
    }, [windowFullscreen]);

    return (
        <section className="markdown-previewer" ref={previewRef}>
            <div id="preview-navbar">
                <h1>Preview</h1>
                {windowFullscreen === windowState.PREVIEW ? (
                    <button className="contract" onClick={maximisePreview}>
                        <span className="label-hidden">Contract</span>
                        <GiContract aria-hidden={true} focusable={false} />
                    </button>
                ) : (
                    <button className="expand" onClick={maximisePreview}>
                        <span className="label-hidden">Expand</span>
                        <GiExpand aria-hidden={true} focusable={false} />
                    </button>
                )}
            </div>
            <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: previewMarkdown }}
            />
        </section>
    );
};

export default Preview;
