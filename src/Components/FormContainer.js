import React from "react";
import Editor from "./Editor";
import Preview from "./Preview";

const FormContainer = () => {
    return (
        <div id="editor-preview-container">
            <Editor />
            <Preview />
        </div>
    );
};

export default FormContainer;
