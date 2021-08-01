import React from "react";
import Editor from "./Editor";
import Preview from "./Preview";

const FormContainer = () => {
    return (
        <form id="editor-preview-container">
            <Editor />
            <Preview />
        </form>
    );
};

export default FormContainer;
