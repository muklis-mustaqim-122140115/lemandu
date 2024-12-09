import { Link } from '@inertiajs/react';
import React from 'react';

const Navbar: React.FC = () => {
    const isActive = (path: string) =>
        '' === path ? 'bg-[#FFCBC1]' : 'bg-white';

    return (
        <div className="flex">
            {/* Sidebar */}
            <nav className="w-64 bg-white">
                {/* Header tanpa border */}
                <div className="rounded-tr-[20%] bg-[#FFABAB] px-4 py-6">
                    <h1 className="text-2xl font-bold text-white">
                        PortalPosyandu
                    </h1>
                </div>

                {/* Navigation Links, border hanya pada bagian bawah */}
                <ul className="border-grey-300 mt-4 h-full space-y-1 border-r">
                    <li>
                        <Link
                            href="/"
                            className={`block px-4 py-3 text-gray-700 hover:bg-pink-100 ${isActive(
                                '/',
                            )}`}
                        >
                            Kalender
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/bayi"
                            className={`block px-4 py-3 text-gray-700 hover:bg-pink-100 ${isActive(
                                '/bayi',
                            )}`}
                        >
                            Bayi
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/ibu"
                            className={`block px-4 py-3 text-gray-700 hover:bg-pink-100 ${isActive(
                                '/ibu',
                            )}`}
                        >
                            Ibu
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/lansia"
                            className={`block px-4 py-3 text-gray-700 hover:bg-pink-100 ${isActive(
                                '/lansia',
                            )}`}
                        >
                            Lansia
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/login"
                            className={`block px-4 py-3 text-gray-700 hover:bg-pink-100 ${isActive(
                                '/login',
                            )}`}
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/register"
                            className={`block px-4 py-3 text-gray-700 hover:bg-pink-100 ${isActive(
                                '/register',
                            )}`}
                        >
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
