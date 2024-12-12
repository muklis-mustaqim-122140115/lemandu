import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  FaHome,
  FaBaby,
  FaHospital,
  FaUserNurse,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import { MdElderly } from "react-icons/md";

const Navbar: React.FC = () => {
  const { auth } = usePage().props;

  const isActive = (path: string) =>
    route().current() === path ? "bg-[#FFC1C1]" : "bg-transparent";  

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 bg-gradient-to-t from-[#FFE2DC] to-white sticky top-0 h-screen">
        {/* Header tanpa border */}
        <div className="bg-[#FFABAB] py-6 px-4 rounded-tr-2xl mt-10">
          <h1 className="text-4xl font-bold text-white text-center">Lemandu</h1>
          <h2 className="text-white text-center mt-0.5 text-md">
            Portal Posyandu Lematang
          </h2>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-1 mt-4 border-r border-grey-300 bg-transparent">
          {auth.user && <>
            <li>
            <Link
              href="/"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "dashboard"
              )}`}
            >
              <FaHome /> Beranda
            </Link>
          </li>
          {/* Catatan Kesehatan (non-clickable) */}
          <li>
            <div className="flex items-center gap-2 block py-3 px-4 text-gray-700 cursor-default">
              <FaHospital /> Catatan Kesehatan
            </div>
          </li>
          {/* Submenu for Catatan Kesehatan */}
          <ul className="ml-6 space-y-1">
            <li>
              <Link
                href="/bayi"
                className={`flex items-center gap-2 block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "bayi"
                )}`}
              >
                <FaBaby /> Bayi dan Balita
              </Link>
            </li>
            <li>
              <Link
                href="/ibu"
                className={`flex items-center gap-2 block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "ibu"
                )}`}
              >
                <FaUserNurse /> Ibu Hamil
              </Link>
            </li>
            <li>
              <Link
                href="/lansia"
                className={`flex items-center gap-2 block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "lansia"
                )}`}
              >
                <MdElderly /> Lansia
              </Link>
            </li>
          </ul>
          <li>
            <Link
              href="/laporan-posyandu"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "laporan"
              )}`}
            >
              <FaClipboardList /> Laporan Posyandu
            </Link>
          </li></>}
          {!auth.user ? <>
            <li>
            <Link
              href="/login"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "login"
              )}`}
            >
              <FaSignInAlt /> Login
            </Link>
          </li>
          </> : <>
          <li>
            <Link
              href="/logout"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-red-400 hover:text-white ${isActive(
                "register"
              )}`}
            >
              <FaUserPlus /> Logout
            </Link>
          </li>
          </>}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;