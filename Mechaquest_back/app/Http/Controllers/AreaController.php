<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areas = Area::all()->toArray();
        return array($areas);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $area = new Area([
            'name' => $request->input('name'),
            'background' => $request->input('background'),
            'number_of_battle' => $request->input('number_of_battle'),
            'reward' => $request->input('reward'),
            'required_stam' => $request->input('required_stam'),
        ]);

        $area->save();

        return response()->json('Nouvelle route créée!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($name)
    {
        $area = Area::where("name", $name)->first();
        return response()->json($area);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Area $area)
    {
        $area->update($request->all());
        return response()->json($area);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($name)
    {
        $area = Area::where("name", $name)->first();
        $area->delete();
        return response()->json("La route a été supprimée.");
    }

    // Récupération d'une route supprimée
    public function restore($name)
    {
        Area::withTrashed()->where("name", $name)->restore();
        return response()->json("La route est de nouveau utilisable.");
    }
}
