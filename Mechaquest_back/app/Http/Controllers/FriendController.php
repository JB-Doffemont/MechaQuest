<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * Ajout d'un ami pour un utilisateur dans la BDD.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Friend $friend)
    {
        // Récupération de l'ID de l'utilisateur connecté
        $userId = Auth::id();

        // Création d'un ami, en récupérant l'ID du joueur connecté et l'email de l'ami via input (l'Email est la clé primaire d'un User dans notre cas)
        $friend = new Friend([
            'email_user1' => $userId,
            'email_user2' => $request->input('email_user2'),

        ]);

        // Sauvegarde de cet ami, réponse en json
        $friend->save();
        return response()->json($friend);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
    //     //
    // }

    // Suppression d'un ami de sa liste d'amis
    public function deleteFriend($email, $email1)
    {
        // Récupération d'un ami d'un utilisateur
        $friend = User::where("email", $email)->with('friends')->first();

        // On supprime l'email de cet ami lié à l'utilisateur
        $friend->friends()->detach($email1);

        return response()->json("Cet utilisateur ne fait plus partie de votre liste d'amis.");
    }
}
