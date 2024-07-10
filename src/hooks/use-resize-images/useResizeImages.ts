import { ChangeEvent, useState } from 'react';
import Resizer from 'react-image-file-resizer';

export const useResizeImages = () => {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [resizedImage, setResizedImage] = useState<File | null>(null);

    const resetImages = () => {
        setOriginalImage(null);
        setResizedImage(null);
    };

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>,
        onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            Resizer.imageFileResizer(
                file,
                1080,
                1230,
                'webp',
                100,
                0,
                uri => {
                    if (typeof uri === 'string') {
                        fetch(uri)
                            .then(res => res.blob())
                            .then(blob => {
                                const formattedFile = new File(
                                    [blob],
                                    file.name,
                                    { type: blob.type },
                                );
                                setOriginalImage(formattedFile);
                            });
                    }
                },
                'base64',
            );

            Resizer.imageFileResizer(
                file,
                126,
                143.5,
                'webp',
                100,
                0,
                uri => {
                    if (typeof uri === 'string') {
                        fetch(uri)
                            .then(res => res.blob())
                            .then(blob => {
                                const formattedFile = new File(
                                    [blob],
                                    file.name,
                                    { type: blob.type },
                                );
                                setResizedImage(formattedFile);
                            });
                    }
                },
                'base64',
            );
        }
        onChange(event);
    };
    return { originalImage, resizedImage, handleImageChange, resetImages };
};
