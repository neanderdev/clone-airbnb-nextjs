"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
};

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="bkc4okwh"
            options={{ maxFiles: 1 }}
        >
            {({ open }) => {
                return (
                    <div
                        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                        onClick={() => open?.()}
                    >
                        <TbPhotoPlus size={50} />

                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>

                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={value}
                                    alt="Upload"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
}
