<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BayiController extends Controller
{
    public function index(){
        return Inertia::render("Guest/Bayi");
    }
}
