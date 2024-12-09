import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
import { MdElderly } from "react-icons/md";


const Lansia = ({dataLansia}) => {
    const calculateAge = (birthdate: string) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        const ageYear = today.getFullYear() - birthDate.getFullYear();
        const ageMonth = today.getMonth() - birthDate.getMonth();
        const months = ageMonth < 0 ? 12 + ageMonth : ageMonth;
        return `${ageYear} tahun ${months} bulan`;
      };
    
      if (!dataLansia || !Array.isArray(dataLansia)) {
        return (
        <Guest>
          <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
            <h1 className="text-2xl font-bold text-black mb-6">Data Lansia</h1>
            <div className="flex justify-end mb-4">
              <Link
                href={route("tambahLansia")}
                className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
              >
                Tambah Data
              </Link>
            </div>
            <div className="text-center py-4">
              Data lansia tidak tersedia atau belum diinisialisasi dengan benar.
            </div>
          </div>
          </Guest>
        );
      }
    
      return (
        <Guest>
        <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
          <h1 className="text-2xl font-bold text-black mb-1 flex items-center">
            <MdElderly className="mr-2" />
            Data Lansia
          </h1>
          <div className="flex justify-end mb-4">
            <Link
              href={route("tambahLansia")}
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
                    Tanggal Lahir
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Umur
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Jenis Kelamin
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    No HP
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Nama Wali
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    No Telp Wali
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Alamat
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    BB Lansia
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Tinggi Badan
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    LL
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    LK
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Tensi
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Goldar
                  </th>
                  <th className="border-b border-white px-4 py-2 text-center">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataLansia.length === 0 ? (
                  <tr>
                    <td colSpan={16} className="text-center py-4 text-gray-500">
                      Tidak ada data lansia yang tersedia.
                    </td>
                  </tr>
                ) : (
                  dataLansia.map((lansia, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-[#FFE2DC] text-black"
                          : "bg-[#FFEEEA] text-black"
                      }
                    >
                      <td className="border-b border-white px-4 py-2">
                        {lansia.nik}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.nama}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.tanggallahir}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {calculateAge(lansia.tanggallahir)}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.jeniskelamin}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.noHp || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.namawali || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.telpwali || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.alamat || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.bb || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.tb || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.ll || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.lk || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.tensi || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.goldar || "N/A"}
                      </td>
                      <td className="border-b border-white px-4 py-2">
                        {lansia.keterangan || "N/A"}
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

export default Lansia
