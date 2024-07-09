import React, { FC, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditorInput.scss';
import { editorLabels } from './ua';
import { toolbarOptions } from './toolbarOptions';
import classNames from 'classnames';

interface TextEditorInputProps {
    editorState: EditorState;
    onEditorStateChange: (state: EditorState) => void;
    placeholder: string;
    error: boolean;
    defaultValue?: EditorState;
}

const TextEditorInput: FC<TextEditorInputProps> = ({
    editorState,
    onEditorStateChange,
    placeholder,
    error,
    defaultValue,
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

    return (
        <div className={'editor'}>
            <Editor
                wrapperClassName={wrapperEditorClass}
                editorClassName={'fieldEditor'}
                toolbarClassName={'toolbarEditor'}
                placeholder={placeholder}
                editorState={defaultValue ? defaultValue : editorState}
                onEditorStateChange={onEditorStateChange}
                localization={{ translations: editorLabels }}
                toolbar={toolbarOptions}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {error && <p className={'fieldError'}>Required field</p>}
        </div>
    );
};

export default TextEditorInput;
