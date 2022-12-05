<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use App\Models\RobotPositionsBattles;
use Exception;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Récupération de toutes les positions des ennemis dans une planete.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //  Area::all()->toArray();
        //  Robot::all()->toArray();
        $position = RobotPositionsBattles::all();

        return response()->json($position);
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
     * Création d'une nouvelle position pour une route.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // On spécifie le robot voulu, le nom de la planète concernée, et sa position de combat
        $position = new RobotPositionsBattles([
            'robot_id' => $request->input('robot_id'),
            'area_name' => $request->input('area_name'),
            'position' => $request->input('position'),
        ]);

        $position->save();
        return response()->json($position);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($area, $position)
    {

        $robot = RobotPositionsBattles::where('area_name', $area)
            ->where('position', $position)->first();

        $robotId = $robot->robot_id;

        $robotData = Robot::where('id', $robotId)->first();

        return response()->json([$robotData, 'status_code' => 200]);
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
     * Mis à jour d'une position deja existante en BDD.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function update(Request $request, $area, $position)
    // {
    //     Area::all();
    //     $area->update($request->all());
    //     $position->update($request->all());
    //     return response()->json($position);
    // }

    public function update(Request $request, $area, $position, RobotPositionsBattles $robot)
    {
        try {
            $robot = RobotPositionsBattles::select('*')
                ->where('area_name', $area)
                ->where('position', $position)
                ->update(["robot_id" => $request['robot_id']]);

            return response()->json($robot);
        } catch (Exception $e) {

            return response([
                'status_code' => 500,
                'message' => 'erreur'

            ]);
        }
    }

    /**
     * Suppression des positions d'une route (soft-delete).
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($area, $positionId)
    {
        $position = RobotPositionsBattles::select('*')
            ->where('area_name', $area)
            ->where('position', $positionId)
            ->delete();

        return response()->json($position);
    }

    // Récupération des positions
    public function restore($area, $positionId)
    {
        RobotPositionsBattles::withTrashed()
            ->where('area_name', $area)
            ->where('position', $positionId)
            ->restore();

        return response()->json("La position est à nouveau disponible!");
    }
}
