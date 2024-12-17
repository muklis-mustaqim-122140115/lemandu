<?php

namespace App\Http\Controllers;

use App\Models\Bayi;
use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BayiController extends Controller
{
    public function index(Request $request){
        $filter_bulan = $request->query("filter");
        if (!$filter_bulan){
            $filter_bulan = "Januari";
        }
                
        switch ($filter_bulan) {
            case "Januari":
                $filter = 1;
                break;
            case "Februari":
                $filter = 2;
                break;
            case "Maret":
                $filter = 3;
                break;
            case "April":
                $filter = 4;
                break;
            case "Mei":
                $filter = 5;
                break;
            case "Juni":
                $filter = 6;
                break;
            case "Juli":
                $filter = 7;
                break;
            case "Agustus":
                $filter = 8;
                break;
            case "September":
                $filter = 9;
                break;
            case "Oktober":
                $filter = 10;
                break;
            case "November":
                $filter = 11;
                break;
            case "Desember":
                $filter = 12;
                break;
            default:
                $filter = 1; // Default to Januari if there's an invalid input
                break;
        }
        $bayi = Bayi::whereMonth('created_at', $filter)->where("akun_id",Auth::user()->id)->get();
        return Inertia::render("Guest/Bayi", ["dataBayi"=> $bayi]);
    }

    public function create(){
        return Inertia::render("Guest/TambahBayi");
    }

    public function store(Request $request){
        $bayi = Bayi::create([
            "akun_id" => Auth::user()->id,
            "nik" => $request->nik ,
            "nama" => $request->nama ,
            "jenisKelamin" => $request->jenisKelamin ,
            "umur" => $request->umur ,
            "bb" => $request->bb ,
            "tb" => $request->tb ,
            "tanggalLahir" => $request->tanggalLahir ,
            "namaOrangTua" => $request->namaOrangTua ,
            "nikOrangTua" => $request->nikOrangTua ,
            "lk" => $request->lk ,
            "ll" => $request->ll ,
            "keterangan" => $request->keterangan
        ]);
        $history = History::create([
            "jenis"=>"bayi",
            "akun_id" => Auth::user()->id
        ]);
        $history->label = $bayi->id . $bayi->created_at;
        $history->save();
    }


    public function update(Request $request, $id){
        $bayi = Bayi::findOrFail($id);
        $bayi->update($request->all());
    }

    public function destroy($id){
        $bayi = Bayi::findOrFail($id);
        $history = History::where("label", $bayi->id . $bayi->created_at)->first();
        if($history){
            $history->delete();
        }
        $bayi->delete();
    }
}
