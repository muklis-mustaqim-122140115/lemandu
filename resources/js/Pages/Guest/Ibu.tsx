import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
import { FaUserNurse } from "react-icons/fa";

const Ibu = ({dataIbu}) => {
    if (!dataIbu || !Array.isArray(dataIbu)) {
        return (
        <Guest>
          <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
            <h1 className="text-2xl font-bold text-black mb-6">Data Ibu Hamil</h1>
            <div className="flex justify-end mb-4">
              <Link
                href={route('tambahIbu')}
                className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
                >
                Tambah Data
              </Link>
            </div>
            <div className="text-center py-4">
              Data ibu hamil tidak tersedia atau belum diinisialisasi dengan benar.
            </div>
          </div>
        </Guest>
        );
      }
    
      return (
        <Guest>
        <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
          <h1 className="text-2xl font-bold text-black mb-1 flex items-center">
            <FaUserNurse className="mr-2" />
            Data Ibu Hamil
          </h1>
          <div className="flex justify-end mb-4">
            <Link
              href={route("tambahIbu")}
              className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
            >
              Tambah Data
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse rounded-md overflow-hidden">
              <thead className="bg-[#FFABAB] text-gray-900">
                <tr>
                  <th className="border-b border-white px-4 py-2 text-center">
                    NIK
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Nama
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    NIK Suami
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Nama Suami
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Tanggal Lahir
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Umur
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Alamat
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    BB Sebelum
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    BB Sesudah
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    TB
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Hb
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Goldar
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Tinggi Fundus
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Jadwal Lahir
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Telepon
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Keluhan
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataIbu.length === 0 ? (
                  <tr>
                    <td colSpan={17} className="text-center py-4 text-gray-500">
                      Tidak ada data ibu hamil.
                    </td>
                  </tr>
                ) : (
                  dataIbu.map((ibu, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-[#FFE2DC] text-black"
                          : "bg-[#FFEEEA] text-black"
                      }
                    >
                      <td className="border-b border-white px-4 py-2">{ibu.nik}</td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.nama}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.niksuami}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.namasuami}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.tanggallahir}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.umur}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.alamat}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.bbsebelum} kg
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.bbsesudah} kg
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.tb} cm
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.hemoglobin} g/dL
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.goldar}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.tinggifundus} cm
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.jadwallahir}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.telepon}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.keluhan}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {ibu.keterangan}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </Guest>
      );
    };

export default Ibu
