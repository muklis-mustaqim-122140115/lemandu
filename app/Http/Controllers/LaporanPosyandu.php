<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanPosyandu extends Controller
{
    public function index(Request $request){
        $filter = $request->query("filter");
        
        $history = History::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
        ->where('jenis', $filter)
        ->groupBy('bulan')
        ->orderBy('bulan')
        ->get();

        return Inertia::render("Guest/LaporanPosyandu",["laporan"=> $history]);
    }
}
