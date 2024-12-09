<?php

namespace App\Http\Controllers;

use App\Models\Ibu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IbuController extends Controller
{
    public function index(){
        $ibu = Ibu::all();
        return Inertia::render("Guest/Ibu", ["dataIbu"=> $ibu]);
    }

    public function create(){
        return Inertia::render("Guest/TambahIbu");
    }

    public function store(Request $request){
        $ibu = Ibu::create($request->all());
    }
}
