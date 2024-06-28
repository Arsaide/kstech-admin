import React, { FC } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditorInput.css';
import BoldIcon from '../../../../../../lib/icons/BoldIcon';

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
                            icon: './icons/bold.svg',
                        },
                        italic: {
                            icon: ['./icons/italic.svg'],
                        },
                        underline: {
                            icon: ['./icons/underline.svg'],
                        },
                        strikethrough: {
                            icon: ['./icons/strikethrough.svg'],
                        },
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                    },
                }}
            />
            <BoldIcon />
        </div>
    );
};

export default TextEditorInput;
