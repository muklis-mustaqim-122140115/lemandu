<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(){
        $events = Event::orderBy("created_at","desc")->where("akun_id",Auth::user()->id)->get();

        $historyIbu = History::orderBy("created_at","desc")->where("jenis","ibu")->where("akun_id",Auth::user()->id)->get()->count();
        $historyBayi = History::orderBy("created_at","desc")->where("jenis","bayi")->where("akun_id",Auth::user()->id)->get()->count();
        $historyLansia = History::orderBy("created_at","desc")->where("jenis","lansia")->where("akun_id",Auth::user()->id)->get()->count();

        return Inertia::render("Guest/Calendar", ["dataEvent"=>$events,"historyIbu"=>$historyIbu,"historyBayi"=>$historyBayi,"historyLansia"=>$historyLansia]);
    }

    public function store(Request $request){
        $date = Carbon::parse($request->start)->format("Y-m-d");
        $event = Event::create([
            "akun_id"=>Auth::user()->id,
            "start"=> $date,
            "allDay"=> $request->allDay,
            "description"=> $request->description,
            "location"=> $request->location
        ]);
    }

    public function destroy($id){
        $event = Event::find($id);
        $event->delete();
    }
}
