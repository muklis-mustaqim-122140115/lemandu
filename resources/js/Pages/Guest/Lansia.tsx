import {useState} from "react";
import Guest from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { MdElderly } from "react-icons/md";

interface LansiaInterface{
  id?:number;
  nik?: string;
  name?: string;
  tanggallahir?: string;
  umur?: string;
  jeniskelamin?: "Laki-laki" | "Perempuan";
  noHp?: string;
  namawali?: string;
  telpwali?: string;
  alamat?: string;
  bb?: number;
  tb?: number;
  ll?: number;
  lk?: number;
  tensi?: number;
  goldar?: string;
  keterangan?: string;
}

interface ResponseData{
  dataLansia:LansiaInterface[];
}

const Lansia:React.FC<ResponseData> = ({dataLansia}) => {
  const [data, setData] = useState<LansiaInterface>()
  const [umur, setUmur] = useState<string>()
  const [isOpen, setIsOpen] = useState<boolean>()
  const [filter,setFilter] = useState<string>(window.location.search.substring(8))

  const calculateAge = (birthdate: string | undefined) => {
    if (!birthdate) {
      return "Tanggal lahir tidak valid"; // Or any default message when birthdate is undefined
    }
  
    const today = new Date();
    const birthDate = new Date(birthdate);
    const ageYear = today.getFullYear() - birthDate.getFullYear();
    const ageMonth = today.getMonth() - birthDate.getMonth();
    const months = ageMonth < 0 ? 12 + ageMonth : ageMonth;
    return `${ageYear} tahun ${months} bulan`;
  };
  

      const handleSave = () => {
        if (!data) {
          console.error("Data is undefined.");
          return;
        }

        window.axios.put(route("lansia.update",{id:data.id}),data).then((res)=>{
          window.location.href = route("lansia");
        }).catch((err)=>{
          console.log(err);
          
        })
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
        
          setData((prev) => ({
            ...prev,
            [name]: name === "id" ? (value ? Number(value) : 0) : value, // Ensure 'id' is always a valid number (or 0 if undefined)
          }));
        
          if (name === "tanggallahir") {
            setUmur(calculateAge(value));
          }
        };

        const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>)=>{
          setFilter(e.target.value)
          window.location.href = route("lansia") + "?filter=" + e.target.value;
        }
    
      const handleDelete = (id:number)=>{
        window.axios.delete(route("lansia.delete",{id:id})).then((res)=>{
          window.location.href = route("lansia");
          
        }).catch((err)=>{
          console.log(err);
          
        })
    }

    const openModal = (lansia:LansiaInterface)=>{
      setData(lansia);
      setUmur(calculateAge(lansia.tanggallahir))
      setIsOpen(true);
    }
    const closeModal = ()=>{
      setIsOpen(false)
    }
    
      if (!dataLansia || !Array.isArray(dataLansia)) {
        return (
        <Guest>
          <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
            <h1 className="text-2xl font-bold text-black mb-6">Data Lansia</h1>
            <div className="flex justify-end mb-4">
            <select onChange={handleChangeFilter} value={filter} name="filter_bulan" id="filter_bulan">
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
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
          <div className="flex gap-4 justify-end mb-4">
          <select onChange={handleChangeFilter} value={filter} name="filter_bulan" id="filter_bulan">
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
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
                  <th className="border-b border-white px-4 py-2 text-center">
                    Aksi
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
                        {lansia.name}
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
                      <td className="flex gap-2 align-center">
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded"  onClick={()=>{openModal(lansia)}}>Edit</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>{handleDelete(lansia.id ?? 0)}} >Delete</button>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Data Lansia</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">NIK</label>
            <input
              type="text"
              name="nik"
              value={data?.nik}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={data?.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tanggal Lahir</label>
            <input
              type="date"
              name="tanggallahir"
              value={data?.tanggallahir}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
          <label className="block text-sm font-medium">Umur</label>
            <input
              type="text"
              disabled
              name=""
              value={umur}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
          <label className="block text-sm font-medium">Jenis Kelamin</label>
          <select
              name="jeniskelamin"
              value={data?.jeniskelamin || ""}
              onChange={handleChange}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">No HP</label>
            <input
              type="text"
              name="noHp"
              value={data?.noHp}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama Wali</label>
            <input
              type="text"
              name="namawali"
              value={data?.namawali}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">No HP Wali</label>
            <input
              type="text"
              name="telpwali"
              value={data?.telpwali}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={data?.alamat}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Berat Badan (BB)</label>
            <input
              type="number"
              name="bb"
              value={data?.bb}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tinggi Badan (TB)</label>
            <input
              type="number"
              name="tb"
              value={data?.tb}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lingkar Lengan(LL)</label>
            <input
              type="number"
              name="ll"
              value={data?.ll}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lingkar Kepala(LK)</label>
            <input
              type="number"
              name="lk"
              value={data?.lk}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tensi Darah (mmHg)</label>
            <input
              type="number"
              name="tensi"
              value={data?.tensi}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Golongan Darah</label>
            <select
              name="goldar"
              value={data?.goldar}
              onChange={handleChange}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            >
              <option value="">Pilih Golongan Darah</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">Keterangan</label>
            <textarea
              name="keterangan"
              value={data?.keterangan}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
          onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
      )}
        </div>
        </Guest>
      );
    };

export default Lansia
