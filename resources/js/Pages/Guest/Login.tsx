import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Guest from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => window.location.href = route('dashboard'),
        });
    };

    return (
        <Guest>
            <div className="h-screen flex items-center justify-center bg-gradient-to-t from-[#FFE2DC] to-white bg-cover bg-center">
                <div className="flex flex-col md:flex-row bg-white/50 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden w-[40%] md:h-[60%]">
                    {/* Bagian Masuk */}
                    <div className="flex-1 p-2 flex items-center justify-center">
                        <div className="w-full max-w-md px-8 py-6">
                            <h2 className="text-2xl font-bold mb-6 text-center text-black">
                                Masuk
                            </h2>
                            <form className="space-y-6" onSubmit={submit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="contoh@gmail.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <InputError message={errors.email} className="mt-2" />
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-black"
                                    >
                                        Kata Sandi
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Masukkan Kata Sandi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && (
                                        <InputError message={errors.password} className="mt-2" />
                                    )}
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="block text-sm text-blue-500 hover:underline"
                                    >
                                        Lupa Kata Sandi?
                                    </Link>
                                )}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 px-4 bg-[#48D1CC] text-white font-semibold rounded-md hover:bg-[#a3fffc] hover:text-gray-100 transition-colors"
                                >
                                    Masuk
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}