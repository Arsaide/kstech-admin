import { useRef, useState } from 'react';
import { applyStyle, TStyle } from './applyStyle';

export function useEditorText() {
    const [text, setText] = useState<string>('');
    const [selectionStart, setSelectionStart] = useState<number>(0);
    const [selectionEnd, setSelectionEnd] = useState<number>(0);

    const textRef = useRef<HTMLTextAreaElement | null>(null);

    const updateSelection = () => {
        if (!textRef.current) return;
        setSelectionStart(textRef.current?.selectionStart);
        setSelectionEnd(textRef.current?.selectionEnd);
    };

    const applyFormat = (type: TStyle) => {
        const selectedText = text.substring(selectionStart, selectionEnd);

        if (!selectedText) return;

        const before = text.substring(0, selectionStart);
        const after = text.substring(selectionEnd);

        const formattedText = applyStyle(type, selectedText);

        setText(before + formattedText + after);
    };

    const lineBreak = () => {
        const beforeCursor = text.substring(0, selectionStart);
        const afterCursor = text.substring(selectionStart);
        setText(beforeCursor + '<br/>' + afterCursor);
        setSelectionStart(selectionStart + 6);
        setSelectionEnd(selectionStart + 6);
    };

    return {
        text,
        applyFormat,
        updateSelection,
        setText,
        textRef,
        lineBreak,
    };
}
