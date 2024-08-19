"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useRentModal } from "../../hooks/useRentModal";

import { Heading } from "../Heading";
import { CategoryInput } from "../inputs/CategoryInput";
import { Counter } from "../inputs/Counter";
import { CountrySelect } from "../inputs/CountrySelect";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";
import { categories } from "../navbar/Categories";
import { Modal } from "./Modal";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
};

export function RentModal() {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    });

    const categoryValue = watch("category");
    const locationValue = watch("location");
    const guestCountValue = watch("guestCount");
    const roomCountValue = watch("roomCount");
    const bathroomCountValue = watch("bathroomCount");
    const imageSrcValue = watch("imageSrc");

    const Map = useMemo(() => dynamic(() => import('../Map').then((fn) => fn.Map), {
        ssr: false,
    }), [locationValue]);

    function setCustomValue(id: string, value: any) {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    function onBack() {
        setStep((value) => value - 1);
    }

    function onNext() {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post("/api/listings", data)
            .then(() => {
                toast.success("Listing Created!");

                router.refresh();

                reset();

                setStep(STEPS.CATEGORY);

                rentModal.onClose();
            })
            .catch(() => {
                toast.success("Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }

        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a category"
            />

            <div className="grid grid-col-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((category, index) => (
                    <div key={index} className="col-span-1">
                        <CategoryInput
                            label={category.label}
                            icon={category.icon}
                            selected={category.label === categoryValue}
                            onClick={(category) => setCustomValue('category', category)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />

                <CountrySelect
                    value={locationValue}
                    onChange={(value) => setCustomValue("location", value)}
                />

                <Map
                    center={locationValue?.latlng}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />

                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCountValue}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />

                <hr />

                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCountValue}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />

                <hr />

                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCountValue}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />

                <ImageUpload
                    value={imageSrcValue}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you description your place?"
                    subtitle="Short and sweet works best!"
                />

                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <hr />

                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />

                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    );
}
