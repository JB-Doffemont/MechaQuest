<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Robot;
use App\Models\RobotPositionsBattles;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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
    // public function update(Request $request, $area, $position)
    // {
    //     Area::all();
    //     $area->update($request->all());
    //     $position->update($request->all());
    //     return response()->json($position);
    // }

    public function update(Request $request, $area, $robot, RobotPositionsBattles $position)
    {
        $area = Area::findOrFail($area);
        $robot = Robot::findOrFail($robot);

        $area_name = $area->name;
        $robot_id = $robot->id;

        $position = RobotPositionsBattles::select('*')
            ->where('area_name', $area_name)
            ->where('robot_id', $robot_id)
            ->update(["position" => $request['position'], "robot_id" => $request['robot_id']]);

        return response()->json($position);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
