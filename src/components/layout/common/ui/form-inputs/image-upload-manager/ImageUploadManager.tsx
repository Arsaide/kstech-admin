import React, { FC, useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import './ImageUploadManager.css';

interface ImageUploadManagerProps {
    field: any;
    label?: string;
}

interface ImageFile {
    file: File;
    preview: string;
}

const ImageUploadManager: FC<ImageUploadManagerProps> = ({ field, label }) => {
    const [images, setImages] = useState<ImageFile[]>(field.value || []);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newImages = acceptedFiles.map((file: File) => {
                const imageFile = Object.assign(file, {
                    preview: URL.createObjectURL(file),
                });
                return imageFile as unknown as ImageFile;
            });
            setImages(prevImages => [...prevImages, ...newImages]);
            field.onChange([...images, ...newImages]);
        },
        [field, images],
    );

    const removeImage = (fileToRemove: ImageFile) => {
        const updatedImages = images.filter(
            image => image.preview !== fileToRemove.preview,
        );
        setImages(updatedImages);
        field.onChange(updatedImages);
        URL.revokeObjectURL(fileToRemove.preview);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' as unknown as Accept,
    });

    return (
        <div>
            <div
                {...getRootProps({ className: 'dropzone' })}
                className={'dropzoneStyle'}
            >
                <input {...getInputProps()} />
                <p>
                    {label
                        ? label
                        : ' Drag &apos;n&apos; drop some files here, or click to select\n' +
                          '                    files'}
                </p>
            </div>
            <div className={'previewContainerStyle'}>
                {images.map((image, index) => (
                    <div key={index} className={'imageContainerStyle'}>
                        <img
                            src={image.preview}
                            alt="Preview"
                            className={'imageStyle'}
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(image)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploadManager;
