import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaUserNurse } from "react-icons/fa";

interface IbuInterface{
  id?:number;
  nik?: string;
  name?: string;
  tanggallahir?: string;
  niksuami?: string;
  namasuami?: string;
  umur?: string;
  telepon?: string;
  alamat?: string;
  bbsebelum?: number;
  bbsesudah?: number;
  tb?: number;
  ll?: number;
  goldar?: number;
  hemoglobin?: number;
  tinggifundus?: number;
  jadwallahir?: string;
  keluhan?: string;
  keterangan?: string;
}

interface ResponseData{
  dataIbu:IbuInterface[];
}

const Ibu: React.FC<ResponseData> = ({dataIbu}) => {
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

  const calculateAge = (tanggalLahir: string | undefined) => {
    if (!tanggalLahir) {
      return "Tanggal lahir tidak valid"; // Or some default message
    }
  
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
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays += previousMonth;
    }
  
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  
    return `${ageYears} tahun ${ageMonths} bulan ${ageDays} hari`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
  
    // Ensure data structure matches the IbuInterface type
    setData((prev) => ({
      ...prev,
      [name]: name === "id" ? Number(value) || undefined : value,
    }));
  
    if (name === "tanggallahir") {
      setUmur(calculateAge(value));
    }
  };

  const handleSave = () => {
    if (!data) {
      console.error("Data is undefined.");
      return;
    }
  
    // Use data with the non-null assertion
    window.axios.put(route("ibu.update", { id: data.id }), data).then((res) => {
      window.location.href = route("ibu");
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleDelete = (id : number)=>{
    window.axios.delete(route("ibu.delete",{id:id})).then((res)=>{
      window.location.href = route("ibu");
      
    }).catch((err)=>{
      console.log(err);
      
    })
}

  const handleChangeFilter = (e:React.ChangeEvent<HTMLSelectElement>)=>{
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
                        {ibu.name}
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
                        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>{handleDelete(ibu.id ?? 0)}} >Delete</button>
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
