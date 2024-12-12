import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaUserNurse } from "react-icons/fa";

interface IbuInterface{
  id:number;
  nik: string;
  name: string;
  tanggallahir: string;
  niksuami: string;
  namasuami: string;
  umur: stirng;
  telepon: string;
  alamat: string;
  bbsebelum: number;
  bbsesudah: number;
  tb: number;
  ll: number;
  goldar: number;
  hemoglobin: number;
  tinggifundus: number;
  jadwallahir: string;
  keluhan: string;
  keterangan: string;
}

const Ibu = ({dataIbu}) => {
  const [data,setData] = useState<IbuInterface>();
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const [filter,setFilter] = useState<string>(window.location.search.substring(8))
  const [umur,setUmur] = useState<string>()

  const openModal = (ibu:IbuInterface)=>{
    setData(ibu);
    setUmur(calculateAge(ibu.tanggallahir))
    setIsOpen(true);
  }
  const closeModal = ()=>{
    setIsOpen(false)
  }

  const calculateAge = (tanggalLahir: string) => {
    const birthDate = new Date(tanggalLahir);
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

  const handleChange = (e)=>{
    const { name, value } = e.target;
    
      setData({ ...data, [name]: value });
      if (name === "tanggallahir") {
        setUmur(calculateAge(value));
      }
  }

  const handleSave = () => {
    window.axios.put(route("ibu.update",{id:data.id}),data).then((res)=>{
      window.location.href = route("ibu");
    }).catch((err)=>{
      console.log(err);
      
    })
    };

  const handleDelete = (id)=>{
    window.axios.delete(route("ibu.delete",{id:id})).then((res)=>{
      window.location.href = route("ibu");
      
    }).catch((err)=>{
      console.log(err);
      
    })
}

  const handleChangeFilter = (e)=>{
    setFilter(e.target.value)
    window.location.href = route("ibu") + "?filter=" + e.target.value;
  }

    if (!dataIbu || !Array.isArray(dataIbu)) {
        return (
        <Guest>
          <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
            <h1 className="text-2xl font-bold text-black mb-6">Data Ibu Hamil</h1>
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
                  <th className="border-b border-white px-4 py-2 text-left">
                    Aksi
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
                      <td className="flex gap-2">
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded"  onClick={()=>{openModal(ibu)}}>Edit</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>{handleDelete(ibu.id)}} >Delete</button>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Data Ibu Hamil</h2>
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
            <label className="block text-sm font-medium">NIK Suami</label>
            <input
              type="text"
              name="niksuami"
              value={data?.niksuami}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama Suami</label>
            <input
              type="text"
              name="namasuami"
              value={data?.namasuami}
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
            <label className="block text-sm font-medium">BB Sebelum</label>
            <input
              type="number"
              name="bbsebelum"
              value={data?.bbsebelum}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">BB Sesudah</label>
            <input
              type="number"
              name="bbsesudah"
              value={data?.bbsesudah}
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
            <label className="block text-sm font-medium">Tinggi Fundus (CM)</label>
            <input
              type="number"
              name="tinggifundus"
              value={data?.tinggifundus}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tanggal Lahir</label>
            <input
              type="date"
              name="tanggallahir"
              value={data?.tanggalLahir}
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
          <div>
            <label className="block text-sm font-medium">Nomor Telepon</label>
            <input
              type="text"
              name="telepon"
              value={data?.telepon}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">Keluhan</label>
            <textarea
              name="keluhan"
              value={data?.keluhan}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
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
        </Guest>
      );
    };

export default Ibu
