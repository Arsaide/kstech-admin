import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomTooltip } from '../../custom-components/custom-tooltip/CustomTooltip';
import { Bold, Eraser, Italic, Underline, WrapText } from 'lucide-react';
import { useEditorText } from '../../../../../../hooks/use-editor-text/useEditorText';
import {
    ActionsContainer,
    FormattedTextContainer,
    StyledTextFieldMultiline,
    ToolsButton,
} from '../../custom-components/custom-formatted-text/CustomFormattedText';

interface ITextFormatInput {
    id: string;
    name: string;
    label: string;
    placeholder: string;
}

const TextFormatInput: FC<ITextFormatInput> = ({
    id,
    name,
    label,
    placeholder,
}) => {
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            lineBreak();
        }
    };

    return (
        <FormattedTextContainer>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <StyledTextFieldMultiline
                        {...field}
                        id={id}
                        inputRef={textRef}
                        spellCheck={false}
                        onSelect={updateSelection}
                        label={label}
                        placeholder={placeholder}
                        multiline={true}
                        variant={'outlined'}
                        error={!!error}
                        helperText={error ? error.message : ''}
                    />
                )}
            />
            <ActionsContainer>
                <CustomTooltip
                    title={'Очистити весь текст'}
                    placement={'bottom'}
                >
                    <ToolsButton onClick={() => setText('')}>
                        <Eraser />
                    </ToolsButton>
                </CustomTooltip>
                <CustomTooltip title={'Жирний шрифт'} placement={'bottom'}>
                    <ToolsButton onClick={() => applyFormat('bold')}>
                        <Bold />
                    </ToolsButton>
                </CustomTooltip>
                <CustomTooltip title={'Курсивний шрифт'} placement={'bottom'}>
                    <ToolsButton onClick={() => applyFormat('italic')}>
                        <Italic />
                    </ToolsButton>
                </CustomTooltip>
                <CustomTooltip
                    title={'Підкреслений текст'}
                    placement={'bottom'}
                >
                    <ToolsButton onClick={() => applyFormat('underline')}>
                        <Underline />
                    </ToolsButton>
                </CustomTooltip>
                <CustomTooltip title={'Зробити відступ'} placement={'bottom'}>
                    <ToolsButton onClick={() => lineBreak()}>
                        <WrapText />
                    </ToolsButton>
                </CustomTooltip>
            </ActionsContainer>
        </FormattedTextContainer>
    );
};

export default TextFormatInput;
