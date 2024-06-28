import React, { FC } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditorInput.css';

interface TextEditorInputProps {
    editorState: EditorState;
    onEditorStateChange: (state: EditorState) => void;
    placeholder: string;
}

const TextEditorInput: FC<TextEditorInputProps> = ({
    editorState,
    onEditorStateChange,
    placeholder,
}) => {
    return (
        <div className={'editor'}>
            <Editor
                wrapperClassName={'wrapperEditor'}
                editorClassName={'fieldEditor'}
                toolbarClassName={'toolbarEditor'}
                placeholder={placeholder}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    options: ['inline', 'list', 'link', 'history'],
                    inline: {
                        options: [
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                        ],
                        bold: {
                            icon: ['./icons/bold-icon.svg'],
                            className: undefined,
                        },
                        italic: {
                            icon: ['./icons/italic-icon.svg'],
                            className: undefined,
                        },
                        underline: {
                            icon: ['./icons/underline-icon.svg'],
                            className: undefined,
                        },
                        strikethrough: {
                            icon: ['./icons/strikethrough-icon.svg'],
                            className: undefined,
                        },
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                        unordered: {
                            icon: ['./icons/list.svg'],
                            className: undefined,
                        },
                        ordered: {
                            icon: ['./icons/list-ordered.svg'],
                            className: undefined,
                        },
                    },
                }}
            />
        </div>
    );
};

export default TextEditorInput;
