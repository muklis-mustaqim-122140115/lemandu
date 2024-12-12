import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Guest from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Guest>
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="flex h-[100%] w-[100%] max-w-[75%] flex-col overflow-hidden bg-white shadow-lg md:h-[100%] md:flex-row">
                    {/* Bagian Form Daftar */}
                    <div className="flex flex-1 items-center justify-center p-8">
                        <div className="w-full max-w-sm">
                            <h2 className="mb-6 text-center text-2xl font-bold text-black">
                                Daftar Akun
                            </h2>
                            <form className="space-y-4" onSubmit={submit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama
                                    </label>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        placeholder="John"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        E-mail
                                    </label>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder="contoh@gmail.com"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-black"
                                    >
                                        Kata Sandi
                                    </label>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        placeholder="Masukkan Kata Sandi"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Konfirmasi Kata Sandi
                                    </label>
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder="Masukkan Kata Sandi Lagi"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="new-password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-[#63C96B] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#52A95A]"
                                >
                                    Daftar Akun
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bagian Informasi Masuk */}
                    <div className="font-montserrat flex flex-1 flex-col items-center justify-center rounded-l-[60px] bg-[#63C96B] p-8">
                        <h2 className="mb-4 text-4xl font-bold text-white">
                            Halo Teman!
                        </h2>
                        <p className="mb-6 text-center text-white">
                            Masuk ke dalam akun Anda untuk menggunakan semua
                            fitur!
                        </p>
                        <Link href="/login">
                            <button className="rounded-md border-2 border-white bg-[#63C96B] px-6 py-2 font-semibold text-white transition-colors hover:bg-[#52A95A]">
                                Masuk
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Guest>
    );
}
