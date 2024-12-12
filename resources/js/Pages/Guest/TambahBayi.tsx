import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const TambahBayi: React.FC = () => {
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    jenisKelamin: "",
    bb: "",
    tb: "",
    tanggalLahir: "",
    namaOrangTua: "",
    nikOrangTua: "",
    lingkarLengan: "",
    lingkarKepala: "",
    keterangan: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [umur, setUmur] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "tanggalLahir") {
      setUmur(calculateAge(value));
    }
  };

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

  const validateForm = () => {
    const newErrors: string[] = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim() && key !== "umur") {
        newErrors.push(`Field "${key}" harus diisi.`);
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        // console.log(formData);
        window.axios.post(route("tambahBayi"),{
            "nik":formData.nik,
            "nama":formData.nik,
            "umur":umur,
            "jenisKelamin":formData.jenisKelamin,
            "bb":formData.bb,
            "tb":formData.tb,
            "namaOrangTua":formData.namaOrangTua,
            "nikOrangTua":formData.nikOrangTua,
            "ll":formData.lingkarLengan,
            "lk":formData.lingkarKepala,
            "keterangan": formData.keterangan,
            "tanggalLahir":formData.tanggalLahir            
        }).then((response) => {
            // console.log(response.data);
            window.location.href = route("bayi");
        }).catch((err)=>{
            console.log(err);  
        })
    }
  };

  return (
    <div className="p-12 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">
        Tambah Data Bayi dan Balita
      </h2>

      {errors.length > 0 && (
        <div className="mb-4 mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 text-black">
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            placeholder="NIK Anak"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama Anak"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <select
            name="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={handleChange}
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
          <input
            type="text"
            name="bb"
            value={formData.bb}
            onChange={handleChange}
            placeholder="BB (Berat Badan)"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <input
            type="text"
            name="tb"
            value={formData.tb}
            onChange={handleChange}
            placeholder="TB (Tinggi Badan)"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          {umur && (
            <div className="text-black mt-2">
              <p>Umur: {umur}</p>
            </div>
          )}
          <input
            type="text"
            name="namaOrangTua"
            value={formData.namaOrangTua}
            onChange={handleChange}
            placeholder="Nama Orang Tua"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <input
            type="text"
            name="nikOrangTua"
            value={formData.nikOrangTua}
            onChange={handleChange}
            placeholder="NIK Orang Tua"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <input
            type="text"
            name="lingkarLengan"
            value={formData.lingkarLengan}
            onChange={handleChange}
            placeholder="Lingkar Lengan (cm)"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <input
            type="text"
            name="lingkarKepala"
            value={formData.lingkarKepala}
            onChange={handleChange}
            placeholder="Lingkar Kepala (cm)"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          />
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            placeholder="Keterangan Tambahan"
            className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-8 px-4 py-2 bg-[#48D1CC] text-white rounded hover:bg-[#CBFFFD] hover:text-gray-400"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahBayi;