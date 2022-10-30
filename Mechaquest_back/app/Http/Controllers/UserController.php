<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Affichage des utilisateurs.
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
     * Affiche un utilisateur précis en récupérant son email et ses données liées (amis, robot).
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
     * Affichage de l'édition des données d'un utilisateur.
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
     * Mise à jour des données d'un utilisateur
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
     * Utilisation d'un softdelete pour supprimer un utilisateur de la base de données
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($email)
    {

        // Récupération de l'email de l'utilisateur pour le cibler précisément
        $user = User::where("email", $email)->first();

        // Suppression des robots liés à cet utilisateur
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
