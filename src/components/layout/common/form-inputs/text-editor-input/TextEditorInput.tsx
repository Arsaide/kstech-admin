import React, { FC, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditorInput.scss';
import { editorLabels } from './ua';
import { toolbarOptions } from './toolbarOptions';
import classNames from 'classnames';
import draftToHtml from 'draftjs-to-html';

interface TextEditorInputProps {
    editorState: EditorState;
    onEditorStateChange: (state: EditorState) => void;
    placeholder: string;
    error: boolean;
}

const TextEditorInput: FC<TextEditorInputProps> = ({
    editorState,
    onEditorStateChange,
    placeholder,
    error,
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const wrapperEditorClass = classNames('wrapperEditor', {
        'wrapperEditor--focused': isFocused,
        'wrapperError--error': error,
    });

    console.log(convertToRaw(editorState.getCurrentContent()));

    return (
        <div className={'editor'}>
            <Editor
                wrapperClassName={wrapperEditorClass}
                editorClassName={'fieldEditor'}
                toolbarClassName={'toolbarEditor'}
                placeholder={placeholder}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                localization={{ translations: editorLabels }}
                toolbar={toolbarOptions}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <textarea
                disabled
                value={draftToHtml(
                    convertToRaw(editorState.getCurrentContent()),
                )}
            />
            {error && <p className={'fieldError'}>Required field</p>}
        </div>
    );
};

export default TextEditorInput;
