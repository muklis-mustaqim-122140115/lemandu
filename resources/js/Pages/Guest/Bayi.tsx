import React, { useState } from "react";
import { FaBaby } from "react-icons/fa";
import Guest from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";


interface BayiInterface{
    id?:number;
    nik?: string;
    nama?: string;
    jenisKelamin?: "Laki-laki" | "Perempuan";
    umur?: number;
    bb?: number;
    tb?: number;
    tanggalLahir?: string;
    namaOrangTua?: string;
    nikOrangTua?: string;
    lk?: number;
    ll?: number;
    keterangan?: string;
}

interface ResponseData{
  dataBayi:BayiInterface[];
}

const Bayi: React.FC<ResponseData> = ({dataBayi}) => {
    const [data,setData] = useState<BayiInterface>()
    const [umur,setUmur] = useState<string>();
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const [filter,setFilter] = useState<string>(window.location.search.substring(8))

    // State to manage modal visibility

    // Function to open the modal
    const openModal = (bayi: BayiInterface) => {
        setData(bayi);
        setUmur(calculateAge(bayi.tanggalLahir));
        setIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsOpen(false);
    };
    const handleDelete = (id : number)=>{
        window.axios.delete(route("bayi.delete",{id:id})).then((res)=>{
          window.location.href = route("bayi");
          
        }).catch((err)=>{
          console.log(err);
          
        })
    }

    const calculateAge = (tanggalLahir: string | undefined) => {
      if (!tanggalLahir) {
        return "Invalid date"; // Handle undefined case
      }
    
      const birthDate = new Date(tanggalLahir); // Safe to use now
      if (isNaN(birthDate.getTime())) {
        return "Invalid date"; // Handle invalid date strings
      }
    
      const today = new Date();
    
      const years = today.getFullYear() - birthDate.getFullYear();
      const months = today.getMonth() - birthDate.getMonth();
      const days = today.getDate() - birthDate.getDate();
    
      let ageYears = years;
      let ageMonths = months;
      let ageDays = days;
    
      if (ageDays < 0) {
        ageMonths--;
        const previousMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        ).getDate();
        ageDays += previousMonth;
      }
    
      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }
    
      return `${ageYears} tahun ${ageMonths} bulan ${ageDays} hari`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
      if (name === "tanggalLahir") {
        setUmur(calculateAge(value));
      }
    };

    const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>)=>{
      setFilter(e.target.value)
      window.location.href = route("bayi") + "?filter=" + e.target.value;
    }
  
    const handleSave = () => {
      if (!data) {
        console.error("Data is undefined.");
        return;
      }
    
      window.axios
        .put(route("bayi.update", { id: data.id }), data)
        .then((res) => {
          window.location.href = route("bayi");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    

      if (!dataBayi || !Array.isArray(dataBayi)) {
    return (
      <Guest><div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">Data Bayi</h1>
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
          href={route('tambahBayi')}
          className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
        >
          Tambah Data
        </Link>
      </div>
      <div className="text-center py-4">
        Data bayi tidak tersedia atau belum diinisialisasi dengan benar.
      </div>
    </div></Guest>
    );
  }

  return (
    <Guest><div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
    <h1 className="text-2xl font-bold text-black mb-1 flex items-center">
      <FaBaby className="mr-2" />
      Data Bayi
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
        href={route('tambahBayi')}
        className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
      >
        Tambah Data
      </Link>
    </div>
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse rounded-md overflow-hidden">
        <thead className="bg-[#FFABAB] text-gray-900">
          <tr>
            <th className="border-b border-white px-4 py-2 text-left">NIK</th>
            <th className="border-b border-white px-4 py-2 text-left">
              Nama
            </th>
            <th className="border-b border-white px-4 py-2 text-left">
              Jenis Kelamin
            </th>
            <th className="border-b border-white px-4 py-2 text-left">
              Umur
            </th>
            <th className="border-b border-white px-4 py-2 text-left">BB</th>
            <th className="border-b border-white px-4 py-2 text-left">TB</th>
            <th className="border-b border-white px-4 py-2 text-left">
              Tanggal Lahir
            </th>
            <th className="border-b border-white px-4 py-2 text-left">
              Nama Orang Tua
            </th>
            <th className="border-b border-white px-4 py-2 text-left">
              NIK Orang Tua
            </th>
            <th className="border-b border-white px-4 py-2 text-left">LK</th>
            <th className="border-b border-white px-4 py-2 text-left">LL</th>
            <th className="border-b border-white px-4 py-2 text-left">
              Keterangan
            </th>
            <th className="border-b border-white px-4 py-2 text-left">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {dataBayi.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center py-4 text-gray-500">
                Tidak ada data bayi.
              </td>
            </tr>
          ) : (
            dataBayi.map((bayi, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-[#FFE2DC] text-black"
                    : "bg-[#FFEEEA] text-black"
                }
              >
                <td className="border-b border-white px-4 py-2">
                  {bayi.nik}
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.nama}
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.jenisKelamin}
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.umur}
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.bb} kg
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.tb} cm
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.tanggalLahir}
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.namaOrangTua}
                </td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.nikOrangTua}
                </td>
                <td className="border-b border-white px-4 py-2">{bayi.lk}</td>
                <td className="border-b border-white px-4 py-2">{bayi.ll}</td>
                <td className="border-b border-white px-4 py-2">
                  {bayi.keterangan}
                </td>
                <td className="flex gap-1">
                    <button className="px-2 py-1 bg-yellow-500 text-white rounded"  onClick={()=>{openModal(bayi)}}>Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => {
                    if (bayi.id !== undefined) {
                      handleDelete(bayi.id);
                    } else {
                      console.error("ID is undefined");
                    }
                  }} >Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal backdrop and content */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Data Bayi</h2>
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
              name="nama"
              value={data?.nama}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Jenis Kelamin</label>
            <select
              name="jenisKelamin"
              value={data?.jenisKelamin}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
          <label className="block text-sm font-medium">Umur</label>
            <input
              type="text"
              disabled
              name="bb"
              value={umur}
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
            <label className="block text-sm font-medium">Tanggal Lahir</label>
            <input
              type="date"
              name="tanggalLahir"
              value={data?.tanggalLahir}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama Orang Tua</label>
            <input
              type="text"
              name="namaOrangTua"
              value={data?.namaOrangTua}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">NIK Orang Tua</label>
            <input
              type="text"
              name="nikOrangTua"
              value={data?.nikOrangTua}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lingkar Kepala (LK)</label>
            <input
              type="number"
              name="lk"
              value={data?.lk}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lingkar Lengan (LL)</label>
            <input
              type="number"
              name="ll"
              value={data?.ll}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
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
  </div></Guest>
  );
};

export default Bayi;