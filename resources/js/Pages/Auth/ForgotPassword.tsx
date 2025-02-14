import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail } from "lucide-react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12">
                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Forgot Your Password?
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        No worries! Enter your email, and we’ll send you a reset
                        link.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={data.email}
                                className="pl-10 w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />

                        <Button className="w-full" disabled={processing}>
                            Send Reset Link
                        </Button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
