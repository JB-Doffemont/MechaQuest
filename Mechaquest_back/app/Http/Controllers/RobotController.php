<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class RobotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $robot = Robot::all();

        return response()->json($robot);
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
        $robot = new Robot([
            'robot_name' => $request->input('robot_name'),
            'type_robot' => $request->input('type_robot'),
            'reward' => $request->input('reward'),
            'price' => $request->input('price'),
        ]);

        $robot->save();

        return response()->json($robot, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $robot = Robot::findOrFail($id);

        return response()->json($robot);
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
        // On récupère le robot
        $robot = Robot::findOrFail($id);

        // On récupère l'utilisateur connecté
        $user = Auth::user();

        /** On vérifie si l'email de l'utilisateur connecté correspond bien au user_email du robot qui sera modifié
         *   En fonction des rôles on autorise la modification d'un ou plusieurs champs
         */
        if ($user->email === $robot->user_email && $user->role === 0) {
            $robot->update($request->only('main_robot'));
        } else if ($user->role === 1) {
            $robot->update($request->all());
        } else {
            return response()->json("Vous n'êtes pas autorisé.");
        }

        return response()->json([$robot, $user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $robot = Robot::findOrFail($id);


        $robot->delete();

        return response()->json("Le robot a été supprimé.");
    }

    public function restore($id)
    {
        Robot::withTrashed()->whereId($id)->restore();

        return response()->json('Robot à nouveau actif !');
    }

    // Ajout d'une entrée dans la BDD qui duplique un robot existant parent lorsqu'un joueur obtient un robot
    public function register_heros()
    {
        $userEmail = Auth::user()->email;
        $robot = Robot::where("robot_name", "Madonna LeRobot")->first();

        // Duplication du robot, et modification de la valeur user_email dans la table robot
        $newRobot = $robot->replicate();
        $newRobot->user_email = $userEmail;
        $newRobot->save();

        return response()->json("Vous venez d'obtenir Madonna!");
    }
}
