import React,{useState} from "react";
import {Link} from "@inertiajs/react"

const Navbar: React.FC = () => {
  const [location,setLocation] = useState(window.location.pathname);

  const isActive = (path: string) =>
    location === path ? "bg-[#FFCBC1]" : "bg-white";

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 bg-white">
        {/* Header tanpa border */}
        <div className="bg-[#FFABAB] py-6 px-4 rounded-tr-[20%]">
          <h1 className="text-2xl font-bold text-white">PortalPosyandu</h1>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-1 mt-4 border-r border-grey-300 h-full">
          <li>
            <Link
              href="/"
              className={`block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/"
              )}`}
            >
              Beranda
            </Link>
          </li>
          {/* Catatan Kesehatan (non-clickable) */}
          <li>
            <div className="block py-3 px-4 text-gray-700 bg-white cursor-default">
              Catatan Kesehatan
            </div>
          </li>
          {/* Submenu for Catatan Kesehatan */}
          <ul className="ml-6 space-y-1">
            <li>
              <Link
                href="/bayi"
                className={`block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "/bayi"
                )}`}
              >
                Bayi dan Balita
              </Link>
            </li>
            <li>
              <Link
                href="/ibu"
                className={`block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "/ibu"
                )}`}
              >
                Ibu Hamil
              </Link>
            </li>
            <li>
              <Link
                href="/lansia"
                className={`block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "/lansia"
                )}`}
              >
                Lansia
              </Link>
            </li>
          </ul>
          <li>
            <Link
              href="/laporan-posyandu"
              className={`block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/laporan-posyandu"
              )}`}
            >
              Laporan Posyandu
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className={`block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/login"
              )}`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className={`block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/register"
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