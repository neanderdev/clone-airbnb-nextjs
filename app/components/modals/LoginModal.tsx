"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useLoginModal } from "../../hooks/useLoginModal";
import { useRegisterModal } from "../../hooks/useRegisterModal";

import { Button } from "../Button";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { Modal } from "./Modal";

export function LoginModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success("Logged in");

                    router.refresh();

                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                type="password"
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />

            <Button
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn("google")}
                outline
            />

            <Button
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
                outline
            />

            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>Already have an account?</div>

                    <div
                        className="text-neutral-800 cursor-pointer hover:underline"
                        onClick={registerModal.onClose}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}
