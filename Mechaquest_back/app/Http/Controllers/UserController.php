<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Redirection vers formulaire d'enregistrement
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Cette store est dans AuthController fonction register
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($email)
    {
        $user = User::where("email", $email)->with('friends')->first();

        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $email
     * @return \Illuminate\Http\Response
     */
    public function edit($email)
    {
        $user = User::where("email", $email)->first();
        return response()->json($user);

        // Redirection vers formulaire de modification des données

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Utilisation d'un softdelete pour supprimer un utilisateur de la base de données
    public function destroy($email)
    {
        $user = User::where("email", $email)->first();
        foreach ($user->robots as $r) {
            $r->delete();
        }
        $user->delete();

        return response()->json("L'utilisateur a été supprimé.");
    }


    // Récupération d'un utilisateur supprimé
    public function restore($email)
    {
        // User::onlyTrashed()->restore();

        User::withTrashed()->where("email", $email)->restore();
        return response()->json("L'utilisateur est de retour!");
    }
}
