<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class RobotController extends Controller
{
    /**
     * Récupère la liste des robots prototypes qui ne possèdent pas d'email.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $robot = Robot::where("user_email", null)->get();

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
     * Inscription d'un nouveau robot en BDD.
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
     * Récupère un robot précis grace à son ID.
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
     * Met à jour un robot précis en bdd.
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
         *  En fonction des rôles on autorise la modification d'un ou plusieurs champs
         */
        if ($user->email === $robot->user_email && $user->role === 0) {

            // Robot::where("user_email", $user->email)
            //     ->where("main_robot", 1)
            //     ->update(['main_robot' => 0]);
            // $robot->update($request->only('main_robot'));
            $robot->update($request->only('current_stam'));
        } else if ($user->role === 1) {
            $robot->update($request->all());
        } else {
            return response()->json("Vous n'êtes pas autorisé.");
        }
        return response()->json([$robot, $user, "status_code" => 200]);
    }

    /**
     * Suppression d'un robot de la BDD via son id.
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

    // Ajout d'une entrée dans la BDD qui duplique un robot existant parent lorsqu'un joueur choisit un robot pour la première fois
    public function register_heros($robotName)
    {
        $userEmail = Auth::user()->email;
        $robot = Robot::where("robot_name", $robotName)->first();

        User::where("email", $userEmail)
            ->update(['first_connexion' => 1]);

        // Duplication du robot, et modification de la valeur user_email dans la table robot
        $newRobot = $robot->replicate();
        $newRobot->user_email = $userEmail;
        $newRobot->main_robot = 1;
        $newRobot->save();

        return response()->json(["Vous venez d'obtenir $robotName !", "status_code" => 200]);
    }

    // Affiche le robot principal (ex: récupération de la carte dans la HomeScreen)
    public function get_main_robot()
    {
        // Récupération de l'email de l'utilisateur connecté
        $userEmail = Auth::user()->email;

        // Récupération de la valeur du champ "main_robot" lié à l'email récupéré auparavant
        $mainRobot = Robot::where("user_email", $userEmail)
            ->where("main_robot", 1)
            ->get();
        return response()->json($mainRobot);
    }

    // Fonction pour augmenter la stamina de tous les robots à une heure précise
    public function increase_stamina()
    {
        $robot = Robot::whereNotNull("user_email")->get();

        // foreach ($robot as $r) {
        //     var_dump($r->current_stam);
        // }
        return response()->json($robot);
    }

    public function echo_test()
    {
        echo "Test de la minute";
    }
}
