<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    /**
     * Récupère toutes les routes/planètes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areas = Area::all();
        return response()->json($areas);
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
     * Ajoute une nouvelle planète en base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $area = new Area([
            'name' => $request->input('name'),
            'background' => $request->input('background'),
            'description' => $request->input('description'),
            'number_of_battle' => $request->input('number_of_battle'),
            'reward' => $request->input('reward'),
            'required_stam' => $request->input('required_stam'),
        ]);

        $area->save();

        return response()->json('Nouvelle route créée!');
    }

    /**
     * Affiche une route précise grâce à son nom.
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
     * Met à jour une route deja existante en BDD.
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
     * Supprime une planète de la BDD (soft-delete)
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

    // Récupération d'une planète supprimée grâce à la méthode withTrashed()
    public function restore($name)
    {
        Area::withTrashed()->where("name", $name)->restore();
        return response()->json("La route est de nouveau utilisable.");
    }
}
