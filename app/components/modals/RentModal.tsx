"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { useRentModal } from "../../hooks/useRentModal";

import { Heading } from "../Heading";
import { CategoryInput } from "../inputs/CategoryInput";
import { CountrySelect } from "../inputs/CountrySelect";
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
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

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

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    );
}
