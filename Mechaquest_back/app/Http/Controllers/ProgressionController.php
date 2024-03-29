<?php

namespace App\Http\Controllers;

use App\Models\Progression;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    /**
     * Affiche la table de progression dans un tableau.
     * Par "progression", cela sous entend l'expérience nécessaire pour monter en niveau.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $progress = Progression::all()->toArray();
        return array($progress);
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
     * Enregistrement en BDD d'un palier de progression, l'expérience nécessaire pour lvl up.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $progression = new Progression([
            'lvl' => $request->input('lvl'),
            'min_xp' => $request->input('min_xp'),
            'max_xp' => $request->input('max_xp'),
        ]);

        $progression->save();

        return response()->json($progression);
    }

    /**
     * Affiche le palier de progression.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($lvl)
    {
        $progression = Progression::where("lvl", $lvl)->first();
        return response()->json($progression);
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
     * Met à jour un palier de progression dans la BDD.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Progression $progression)
    {
        $progression->update($request->all());
        return response()->json($progression);
    }

    /**
     * Suppression d'un palier de progression.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($lvl)
    {
        $progression = Progression::where("lvl", $lvl)->first();
        $progression->delete();
        return response()->json("Le niveau a été supprimé.");
    }

    // Récupération d'un lvl supprimé
    public function restore($lvl)
    {
        Progression::withTrashed()->where("lvl", $lvl)->restore();

        return response()->json("Le niveau est de nouveau utilisable.");
    }
}
