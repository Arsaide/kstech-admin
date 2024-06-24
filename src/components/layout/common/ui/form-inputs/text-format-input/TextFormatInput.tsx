import React, { FC, useEffect } from 'react';
import {
    Controller,
    FieldErrors,
    useForm,
    useFormContext,
} from 'react-hook-form';
import { CustomTooltip } from '../../custom-tooltip/CustomTooltip';
import { Button } from '@mui/material';
import { Bold, Eraser, Italic, Underline, WrapText } from 'lucide-react';
import { useEditorText } from '../../../../../../hooks/use-editor-text/useEditorText';

interface ITextFormatInput {
    id: string;
    name: string;
}

const TextFormatInput: FC<ITextFormatInput> = ({ id, name }) => {
    const { text, setText, textRef, updateSelection, applyFormat, lineBreak } =
        useEditorText();

    const { control, setValue, watch } = useForm();
    const fieldValue = watch(name);

    useEffect(() => {
        setText(fieldValue);
    }, [fieldValue, setText]);

    useEffect(() => {
        setValue(name, text);
    }, [text, setValue, name]);

    return (
        <div className={'card'}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <textarea
                            {...field}
                            id={id}
                            ref={textRef}
                            className={'editor'}
                            spellCheck={'false'}
                            onSelect={updateSelection}
                        />
                        {error && <p>{error.message}</p>}
                    </>
                )}
            />
            <div className={'actions'}>
                <div className={'tools'}>
                    <CustomTooltip
                        title={'Очистити весь текст'}
                        placement={'top'}
                    >
                        <Button
                            className={'toolsBtn'}
                            onClick={() => setText('')}
                        >
                            <Eraser />
                        </Button>
                    </CustomTooltip>
                    <CustomTooltip title={'Жирний шрифт'} placement={'top'}>
                        <Button
                            className={'toolsBtn'}
                            onClick={() => applyFormat('bold')}
                        >
                            <Bold />
                        </Button>
                    </CustomTooltip>
                    <CustomTooltip title={'Курсивний шрифт'} placement={'top'}>
                        <Button
                            className={'toolsBtn'}
                            onClick={() => applyFormat('italic')}
                        >
                            <Italic />
                        </Button>
                    </CustomTooltip>
                    <CustomTooltip
                        title={'Підкреслений текст'}
                        placement={'top'}
                    >
                        <Button
                            className={'toolsBtn'}
                            onClick={() => applyFormat('underline')}
                        >
                            <Underline />
                        </Button>
                    </CustomTooltip>
                    <CustomTooltip title={'Зробити відступ'} placement={'top'}>
                        <Button
                            className={'toolsBtn'}
                            onClick={() => lineBreak()}
                        >
                            <WrapText />
                        </Button>
                    </CustomTooltip>
                </div>
            </div>
        </div>
    );
};

export default TextFormatInput;
