import React from 'react';
import TextFormatInput from '../../components/layout/common/ui/form-inputs/text-format-input/TextFormatInput';

const HomePage = () => {
    return (
        <>
            Auth success :){' '}
            <TextFormatInput
                label={'Test label'}
                placeholder={'Test placeholder'}
                name={'Name'}
                id={'Id'}
            />
        </>
    );
};

export default HomePage;
