<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LaporanPosyandu extends Controller
{
    public function index(Request $request){
        $filter = $request->query("filter");
        
        $history = History::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
        ->where('jenis', $filter)
        ->where("akun_id",Auth::user()->id)
        ->groupBy('bulan')
        ->orderBy('bulan')
        ->get();

        if(!$filter){
            $history = History::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
        ->groupBy('bulan')
        ->where("akun_id",Auth::user()->id)
        ->orderBy('bulan')
        ->get();
        }

        return Inertia::render("Guest/LaporanPosyandu",["laporan"=> $history]);
    }
}
