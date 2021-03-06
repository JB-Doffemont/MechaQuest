<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        // permet de récupérer les robots d'un utilisateur
        $robotUser = Robot::where("user_email", $email)->get();


        return response()->json([$user, $robotUser]);
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
        // On récupère l'utilisateur connecté
        $userConnected = Auth::user();

        /**
         * On vérifie que l'email de l'utilisateur connecté correspond bien à l'utilisateur qui sera modifié
         * En fonction des rôles on autorise la modifications de certains champs
         */
        if ($userConnected->email === $user->email) {
            $user->update($request->only('pseudo'));
            $user->update($request->only('avatar'));
        } else if ($userConnected->role === 1) {
            $user->update($request->all());
        } else {
            return response()->json("Vous n'êtes pas autorisé");
        }

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

        if ($user) {
            foreach ($user->robots as $robot) {
                $robot->delete();
            }
            $user->delete();

            return response()->json("L'utilisateur a été supprimé.", 200);
        } else {
            return response()->json([], 404);
        }
    }


    // Récupération d'un utilisateur supprimé
    public function restore($email)
    {
        // User::onlyTrashed()->restore();

        User::withTrashed()->where("email", $email)->restore();
        return response()->json("L'utilisateur est de retour!");
    }
}
