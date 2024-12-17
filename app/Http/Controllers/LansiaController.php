<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Lansia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LansiaController extends Controller
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

        $lansia = Lansia::whereMonth('created_at', $filter)->where("akun_id",Auth::user()->id)->get();
        return Inertia::render("Guest/Lansia", ["dataLansia"=> $lansia]);
    }

    public function create(){
        return Inertia::render("Guest/TambahLansia");
    }

    public function store(Request $request){
        $lansia = Lansia::create(array_merge($request->all(), ['akun_id' => Auth::user()->id]));
        $history = History::create([
            "jenis"=>"lansia",
            "akun_id"=>Auth::user()->id
        ]);
        $history->label = $lansia->id . $lansia->created_at;
        $history->save();
    }

    public function update(Request $request, $id){
        $lansia = Lansia::findOrFail($id);
        $lansia->update($request->all());
    }

    public function destroy($id){
        $lansia = Lansia::findOrFail($id);
        $history = History::where("label", $lansia->id . $lansia->created_at)->where("akun_id",Auth::user()->id)->first();
        if($history){
            $history->delete();
        }
        $lansia->delete();
    }
}
