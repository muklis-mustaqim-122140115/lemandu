import React, { createContext, useContext, useState } from "react";

interface Bayi {
  nik: string;
  nama: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  umur: number;
  bb: number;
  tb: number;
  tanggalLahir: string;
  namaOrangTua: string;
  nikOrangTua: string;
  lk: number;
  ll: number;
  keterangan: string;
}

interface IbuHamil {
  nik: string;
  nama: string;
  tanggallahir: string;
  niksuami: string;
  namasuami: string;
  umur: number;
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

interface Lansia {
  nik: string;
  nama: string;
  tanggallahir: string;
  umur: number;
  jeniskelamin: "Laki-laki" | "Perempuan";
  noHp?: string;
  namawali: string;
  telpwali: string;
  alamat: string;
  bb: number;
  tb: number;
  ll: number;
  lk: number;
  tensi: number;
  goldar: string;
  keterangan: string;
}

interface DataContextProps {
  dataBayi: Bayi[];
  addBayi: (bayi: Bayi) => void;
  dataIbu: IbuHamil[];
  addIbu: (ibu: IbuHamil) => void;
  dataLansia: Lansia[];
  addLansia: (lansia: Lansia) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataBayi, setDataBayi] = useState<Bayi[]>([]);
  const [dataIbu, setDataIbu] = useState<IbuHamil[]>([]);
  const [dataLansia, setDataLansia] = useState<Lansia[]>([]);

  const addBayi = (bayi: Bayi) => {
    setDataBayi((prev) => [...prev, bayi]);
  };

  const addIbu = (ibu: IbuHamil) => {
    setDataIbu((prev) => [...prev, ibu]);
  };

  const addLansia = (lansia: Lansia) => {
    setDataLansia((prev) => [...prev, lansia]);
  };

  return (
    <DataContext.Provider
      value={{ dataBayi, addBayi, dataIbu, addIbu, dataLansia, addLansia }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};