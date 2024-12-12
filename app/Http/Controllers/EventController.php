<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(){
        $events = Event::orderBy("created_at","desc")->get();

        $historyIbu = History::orderBy("created_at","desc")->where("jenis","ibu")->get()->count();
        $historyBayi = History::orderBy("created_at","desc")->where("jenis","bayi")->get()->count();
        $historyLansia = History::orderBy("created_at","desc")->where("jenis","lansia")->get()->count();

        return Inertia::render("Guest/Calendar", ["dataEvent"=>$events,"historyIbu"=>$historyIbu,"historyBayi"=>$historyBayi,"historyLansia"=>$historyLansia]);
    }

    public function store(Request $request){
        $date = Carbon::parse($request->start)->format("Y-m-d");
        $event = Event::create([
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
