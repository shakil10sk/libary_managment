<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class memberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('member');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $member_data = [
            'name' => $request->name,
            'age' => $request->age,
            'nid' => $request->nid,
            'student_id' => $request->student_id,
            'address' => $request->address,
            'mobile' => $request->mobile,
            'school_name' => $request->school_name,
            'status' => 1,
        ];

        $data_store = DB::table('members')
                            ->insert($member_data);

        if($data_store){
            return response()->json([
                'title' => "Done",
                'status' => "success",
                'message' => "successfully member add done",
            ]);
        }else{
            return response()->json([
                'status' => "error",
                'message' => "faild to save data",
            ]);
        }
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


    public function list_data(){

        $list = DB::table('members')
                // ->select('*')
                ->selectRaw("SQL_CALC_FOUND_ROWS *")
                ->wherenull('deleted_at')
                ->get();

        $total = DB::select("SELECT FOUND_ROWS() AS total")[0]->total;

        // dd($total);

        $response = [
            "data" => $list,
            "recordsTotal" => $total,
            "recordsFiltered" => $total,
            "draw" =>$_GET['draw']
        ];

        echo json_encode($response);
    }
}
