<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Affichage des types des robots.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $type = Type::all()->toArray();

        return array($type);
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
     * Ajout d'un type de robot en BDD.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $type = new Type([
            'type_name' => $request->input('type_name'), // Nom du type du robot
            'base_hp' => $request->input('base_hp'), // Point de vie servant de base pour le type en question
            'base_atk' => $request->input('base_atk'), // Attaque de base du type en question
            'base_def' => $request->input('base_def'), // Défense de base du type en question
            'special' => $request->input('special'), // Attaque spéciale du robot
        ]);
        $type->save();
        return response()->json($type);
    }

    /**
     * .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $type = Type::findOrFail($id);

        return response()->json($type);
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
     * Mise à jour d'un type de robot en BDD.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $type = Type::findOrFail($id);

        $type->update($request->all());

        return response()->json($type);
    }

    /**
     * Suppression d'un type en BDD (soft-delete).
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $type = Type::findOrFail($id);
        $type->delete();
        return response()->json("Type supprimé !");
    }

    // Récupération d'un type supprimé par erreur
    public function restore($id)
    {
        Type::withTrashed()->findOrFail($id)->restore();
        return response()->json('Type récupéré !');
    }
}
