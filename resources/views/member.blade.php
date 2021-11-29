@extends('layouts.master')

@section('title','Member')

@section('main-section')

    <!--page-content-wrapper-->
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="card">
                <div class="card-header" style="background-color: #f7f7f7">
                    <h5 class="float-left"> Member </h5>
                    <a href="javascript:void(0)" id="btn" class="btn btn-success float-right btn-group"
                       onclick="add_member()" ><i class="fas fa-plus"></i> যোগ করুন</a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="member_datatable" class="table table-striped table-bordered dt-responsive"
                               style="width:100%">
                            <thead>
                            <tr>
                                <th>S.L</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Nid</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- member Modal -->
    <div class="modal fade" id="member_modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Member Add Section</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span>
                    </button>

                </div>

                {{-- <form name="member_form" data-parsley-validate  id="member_form" class="form-horizontal form_middle" enctype="multipart/form-data" method="post" onsubmit="savemember()"> --}}
                <form action="javascript:void(0)" id="member_form" class="form-horizontal form_middle" enctype="multipart/form-data" onsubmit="savemember()">

                    <div class="modal-body">

                        <input type="hidden" id="id" name="id">


                        <div class="form-group" id="member_name">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">Member Name<span class="text-danger">*</span></label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="text" id="name" required name="name" class="form-control "
                                       data-parsley-length="[3, 40]" data-parsley-trigger="keyup"
                                       placeholder="Member Name"
                                       data-parsley-error-message="Please Give a Valid Name">
                            </div>
                        </div>

                        <div class="form-group" id="age">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">Member Age</label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="text" id="age" name="age" class="form-control "
                                        data-parsley-trigger="keyup"
                                       placeholder="Member Age"
                                       data-parsley-error-message="Please Give a Valid Name">
                            </div>
                        </div>
                        <div class="form-group" id="member_nid">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">Member NID</label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="text" id="member_nid" name="nid" class="form-control "
                                        data-parsley-trigger="keyup"
                                       placeholder="Member nid"
                                       data-parsley-error-message="Please Give a NID">
                            </div>
                        </div>
                        <div class="form-group" id="student_id">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">student id</label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="text" id="student_id" name="student_id" class="form-control "
                                        data-parsley-trigger="keyup"
                                       placeholder="student id"
                                       data-parsley-error-message="Please Give a student id">
                            </div>
                        </div>

                        <div class="form-group" id="school_name">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">School Name</label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="text" id="school_name" name="school_name" class="form-control "
                                        data-parsley-trigger="keyup"
                                       placeholder="school Name"
                                       data-parsley-error-message="Please Give a valid school name">
                            </div>
                        </div>
                        <div class="form-group" id="mobile">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">mobile<span class="text-danger">*</span></label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="text" id="mobile" name="mobile" class="form-control "
                                        data-parsley-trigger="keyup"
                                       placeholder="mobile"
                                       data-parsley-error-message="Please Give a valid mobile">
                            </div>
                        </div>

                        <div class="form-group" id="address">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">address<span class="text-danger">*</span></label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <textarea name="address" id="address" cols="10"class="form-control " rows="5"></textarea>
                            </div>
                        </div>



                        <div class="form-group row">
                            <div class="col-12 col-lg-10">
                                <span id="error_message" style="color: red;"></span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-space btn-danger btn-xs" onclick="closememberModal()">
                            <i class="fas fa-times"></i> Cancel
                        </button>

                        <button type="submit" class="btn btn-space btn-success btn-xs alertbox"><i class="fas fa-save"></i> Save
                        </button>
                    </div>
                </form>


            </div>
        </div>
    </div>
    <!--  modal end -->

    <!--end page-content-wrapper-->

@endsection

@section('js')
    <script src="{{asset('public/js/custom/member.js')}}"></script>

    <script>
        // member_list();
        $(document).ready(function(){

            console.log('done');


        });

        // function add_member(){
        //         console.log("done");
        //     }

    </script>

@endsection
