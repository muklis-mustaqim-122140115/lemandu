<?php

namespace App\Http\Controllers;

use App\Models\Lansia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LansiaController extends Controller
{
    public function index(){
        $lansia = Lansia::all();
        return Inertia::render("Guest/Lansia", ["dataLansia"=> $lansia]);
    }

    public function create(){
        return Inertia::render("Guest/TambahLansia");
    }

    public function store(Request $request){
        $lansia = Lansia::create($request->all());
    }
}
