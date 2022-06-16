<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use Illuminate\Http\Request;

class RobotController extends Controller
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

        return response()->json($robot);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $robot = Robot::findOrFail($id);

        return response()->json($robot);
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
        $robot = Robot::findOrFail($id);
        $robot->update($request->all());

        return response($robot);
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
        var_dump($robot);

        $robot->delete();

        return response()->json("Le robot a été supprimé.");
    }

    public function restore($id)
    {
        Robot::withTrashed()->whereId($id)->restore();

        return response()->json('Robot à nouveau actif !');
    }
}
