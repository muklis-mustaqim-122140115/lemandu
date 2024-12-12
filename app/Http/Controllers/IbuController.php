<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Ibu;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class IbuController extends Controller
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
        
        // Query the Ibu model, filtering by the month of `created_at`
        $ibu = Ibu::whereMonth('created_at', $filter)->get();
        return Inertia::render("Guest/Ibu", ["dataIbu"=> $ibu]);
    }

    public function create(){
        return Inertia::render("Guest/TambahIbu");
    }

    public function store(Request $request){
        $ibu = Ibu::create($request->all());
        $history = History::create([
            "jenis"=>"ibu"
        ]);
    }

    public function update(Request $request, $id){
        $ibu = Ibu::findOrFail($id);
        $ibu->update($request->all());
    }

    public function destroy($id){
        $ibu = Ibu::findOrFail($id);
        $ibu->delete();
    }
}
