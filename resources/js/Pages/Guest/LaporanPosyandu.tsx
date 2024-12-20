import Guest from '@/Layouts/GuestLayout'
import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

interface DataLaporan{
  bulan:number;
  total:number;
}

interface ResponseLaporan{
  laporan:DataLaporan[];
}

const LaporanPosyandu: React.FC<ResponseLaporan> = ({laporan}) => {
  const [data,setData] = useState<DataLaporan[]>(laporan)
  const [total,setTotal] = useState<number[]>()
  const [chartDimensions, setChartDimensions] = useState({ width: 1280, height: 960 })

  useEffect(()=>{
    const newTotals = Array(13).fill(0);

    newTotals[0] = null;

    data.forEach((d) => {
      newTotals[d.bulan] = d.total; // Bulan 1 ditempatkan pada index 0, dst.
    });

    setTotal(newTotals);

    setChartDimensions({
      width: `${window.innerWidth * 0.9}`,
      height: `${window.innerHeight * 0.9}`,
    });
    
    
  },[data])

  const handleFilter = (filter:string)=>{
    window.location.href = route("laporan") + "?filter=" + filter;
  }
  
  
  
  return (
    <Guest>
      <div className='m-8 flex flex-col justify-center gap-8'>
        <h1 className='font-bold text-5xl text-center'>Laporan Posyandu</h1>
        <div className='flex flex-col md:flex-row gap-8 justify-center'>
          <button onClick={()=>{handleFilter("bayi")}} className='bg-[#48D1CC] px-7 py-16 w-72 text-white shadow-md rounded-xl'><h1 className='font-bold text-3xl text-center'>Bayi & Balita</h1> </button>
          <button onClick={()=>{handleFilter("ibu")}} className='bg-[#48D1CC] px-7 py-16 w-72 text-white shadow-md rounded-xl'><h1 className='font-bold text-3xl text-center'>Ibu Hamil</h1> </button>
          <button onClick={()=>{handleFilter("lansia")}} className='bg-[#48D1CC] px-7 py-16 w-72 text-white shadow-md rounded-xl'><h1 className='font-bold text-3xl text-center'>Lansia</h1> </button>
        </div>
        <div className="grafik flex flex-col justify-center gap-8">
          <h1 className='font-bold text-xl md:text-3xl text-start'><u>Grafik Laporan</u></h1>
        <div className='flex gap-8'>
          <LineChart
            xAxis={[{ scaleType: 'point', data: ["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"] }]}
            series={[
              {
                data: total || [null,null,null,null,null,null,null,null,null,null,null,null,null],label: "Data Bulanan",
          color: "#48D1CC", area:true
              },
            ]}
            width={chartDimensions.width}
            height={chartDimensions.height}
          />
          </div>
        </div>
      </div>
    </Guest>
  )
}

export default LaporanPosyandu
