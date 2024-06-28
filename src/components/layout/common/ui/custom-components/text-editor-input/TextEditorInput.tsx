import React, { FC } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditorInput.scss';

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
                            title: 'Жирний шрифт',
                        },
                        italic: {
                            icon: ['./icons/italic.svg'],
                            title: 'Курсивний шрифт',
                        },
                        underline: {
                            icon: ['./icons/underline.svg'],
                            title: 'Підкреслений шрифт',
                        },
                        strikethrough: {
                            icon: ['./icons/strikethrough.svg'],
                            title: 'Закреслений шрифт',
                        },
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                        unordered: {
                            icon: './icons/list.svg',
                            title: 'Список з колами',
                        },
                        ordered: {
                            icon: './icons/listOrdered.svg',
                            title: 'Список з цифрами',
                        },
                    },
                }}
            />
        </div>
    );
};

export default TextEditorInput;
