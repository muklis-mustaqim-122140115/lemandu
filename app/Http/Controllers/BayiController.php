<?php

namespace App\Http\Controllers;

use App\Models\Bayi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BayiController extends Controller
{
    public function index(){
        $bayi = Bayi::all();
        return Inertia::render("Guest/Bayi", ["dataBayi"=> $bayi]);
    }

    public function create(){
        return Inertia::render("Guest/TambahBayi");
    }

    public function store(Request $request){
        $bayi = Bayi::create($request->all());
        return Inertia::render("Guest/EditBayi", ["dataBayi"=>$bayi]);
    }

    public function edit($id){

    }

    public function update(Request $request, $id){
        $bayi = Bayi::findOrFail($id);
        $bayi->update($request->all());
    }
}
