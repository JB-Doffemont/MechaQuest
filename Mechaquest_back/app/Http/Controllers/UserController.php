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
        $users = User::all()->toArray();

        return array($users);
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
        $user = new User([
            'pseudo' => $request->input('pseudo'),
            'email'  => $request->input('email'),
            'password' => $request->input('password')
        ]);

        $user->save();
        return response()->json('user crée !');
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($email)
    {
        $user = User::where("email", $email)->first();

        return response()->json($user);
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return response()->json($user);
    }

    // Utilisation d'un softdelete pour supprimer un utilisateur de la base de données
    public function destroy($email)
    {
        $user = User::where("email", $email)->first();

        $user->delete();

        return response()->json("L'utilisateur a été supprimé.");
    }

    // Récupération d'un utilisateur supprimé
    public function restore($email)
    {
        // User::onlyTrashed()->restore();

        User::withTrashed()->where("email", $email)->restore();
        return response()->json("POPOPO l'utilisateur est de retour!");
    }
}
