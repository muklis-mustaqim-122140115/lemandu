import React, { useState } from "react";

const TambahIbu: React.FC = () => {
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    tanggallahir: "",
    niksuami: "",
    namasuami: "",
    umur: "",
    telepon: "",
    alamat: "",
    bbsebelum: "",
    bbsesudah: "",
    tb: "",
    ll: "",
    goldar: "",
    hemoglobin: "",
    tinggifundus: "",
    jadwallahir: "",
    keluhan: "",
    keterangan: "",
  });

  const [umur, setUmur] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [error,setError] = useState<string>()
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "tanggallahir") {
      setUmur(calculateAge(value));
    }
  };

  const calculateAge = (tanggallahir: string) => {
    const birthDate = new Date(tanggallahir);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += previousMonthDays;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} tahun, ${months} bulan, ${days} hari`;
  };

  const validateCurrentStep = () => {
    const requiredFieldsByStep = {
      1: ["nik", "nama", "tanggallahir", "niksuami", "namasuami", "alamat"],
      2: [
        "bbsebelum",
        "bbsesudah",
        "tb",
        "telepon",
        "goldar",
        "hemoglobin",
        "tinggifundus",
        "jadwallahir",
        "keluhan",
        "keterangan",
      ],
    };

    const requiredFields = requiredFieldsByStep[step] || [];
    const newErrors = requiredFields
      .filter((field) => !formData[field]?.trim())
      .map((field) => `Field "${field}" harus diisi.`);

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1); // Lanjutkan ke step berikutnya jika validasi berhasil
      setErrors([]); // Hapus error
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateCurrentStep()) {
      window.axios.post(route('tambahIbu'),{
        "nik":formData.nik,
        "name":formData.nama,
        "tanggallahir":formData.tanggallahir,
        "niksuami":formData.niksuami,
        "namasuami":formData.namasuami,
        "umur":umur,
        "telepon":formData.telepon,
        "alamat":formData.alamat,
        "bbsebelum":formData.bbsebelum,
        "bbsesudah":formData.bbsesudah,
        "tb":formData.tb,
        "goldar":formData.goldar,
        "hemoglobin":formData.hemoglobin,
        "tinggifundus":formData.tinggifundus,
        "jadwallahir":formData.jadwallahir,
        "keluhan":formData.keluhan,
        "keterangan":formData.keterangan
      }).then((res)=>{
        console.log(res);
        window.location.href = route('ibu');
      }).catch((err)=>{
        console.log(err)
        setError(err.response.data)
      })
    }
  };

  return (
    <div className="p-12 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">
        Tambah Data Ibu Hamil
      </h2>

      {errors.length > 0 && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 text-black">
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              placeholder="NIK"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="text"
              name="niksuami"
              value={formData.niksuami}
              onChange={handleChange}
              placeholder="NIK Suami"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="text"
              name="namasuami"
              value={formData.namasuami}
              onChange={handleChange}
              placeholder="Nama Suami"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="date"
              name="tanggallahir"
              value={formData.tanggallahir}
              onChange={handleChange}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            {umur && (
              <div className="text-black mt-2">
                <p>Umur: {umur}</p>
              </div>
            )}
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Alamat"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            ></textarea>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4 text-black">
            <input
              type="number"
              name="bbsebelum"
              value={formData.bbsebelum}
              onChange={handleChange}
              placeholder="BB Sebelum"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="bbsesudah"
              value={formData.bbsesudah}
              onChange={handleChange}
              placeholder="BB Sesudah Hamil"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="tb"
              value={formData.tb}
              onChange={handleChange}
              placeholder="Tinggi Badan"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="tinggifundus"
              value={formData.tinggifundus}
              onChange={handleChange}
              placeholder="Tinggi Fundus (cm)"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="date"
              name="jadwallahir"
              value={formData.jadwallahir}
              onChange={handleChange}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="hemoglobin"
              value={formData.hemoglobin}
              onChange={handleChange}
              placeholder="Hemoglobin (g/dL)"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <select
              name="goldar"
              value={formData.goldar}
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
            <input
              type="tel"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              placeholder="Nomor Telepon"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <textarea
              name="keluhan"
              value={formData.keluhan}
              onChange={handleChange}
              placeholder="Keluhan"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            ></textarea>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              placeholder="Keterangan"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            ></textarea>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="mr-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Kembali
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-[#FE8A8A] text-white rounded hover:bg-red-500"
            >
              Berikutnya
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-[#48D1CC] text-white rounded hover:bg-[#CBFFFD] hover:text-gray-400"
            >
              Tambah
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TambahIbu;