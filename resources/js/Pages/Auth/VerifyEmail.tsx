import { Button } from "@/Components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail, LogOut } from "lucide-react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
                <Mail className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                    Verifikasi Email Anda
                </h2>
                <p className="text-gray-600 mb-4">
                    Terima kasih telah mendaftar! Silakan cek email Anda dan
                    klik tautan verifikasi. Jika belum menerima email, klik
                    tombol di bawah untuk mengirim ulang.
                </p>
                {status === "verification-link-sent" && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        Tautan verifikasi baru telah dikirim ke email Anda.
                    </div>
                )}
                <form onSubmit={submit} className="space-y-4">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Kirim Ulang Verifikasi
                    </Button>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full flex justify-center items-center gap-2 text-gray-600 hover:text-gray-900 text-sm underline"
                    >
                        <LogOut className="w-4 h-4" /> Keluar
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}
