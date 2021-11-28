@extends('layouts.master')

@section('title','member add')

@section('main-section')

    <!--page-content-wrapper-->
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="card">
                <div class="card-header" style="background-color: #f7f7f7">
                    <h5 class="float-left"> ক্যাটেগরি এবং সাব-ক্যাটেগরি এর তালিকা</h5>
                    <a href="javascript:void(0)" class="btn btn-success float-right btn-group"
                       onclick="add_category()"><i class="fas fa-plus"></i> যোগ করুন</a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="category_datatable" class="table table-striped table-bordered dt-responsive"
                               style="width:100%">
                            <thead>
                            <tr>
                                <th>নং</th>
                                <th>ক্যাটেগরি</th>
                                <th>ক্যাটেগরি ছবি</th>
                                {{-- <th>Sub-category Icon</th> --}}
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
    <!-- Category Modal -->
    <div class="modal fade" id="category_model" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ক্যাটেগরি ও সাব-ক্যাটাগরি যোগ করুন</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span>
                    </button>

                </div>

                {{-- <form name="categoris_form" data-parsley-validate  id="categoris_form" class="form-horizontal form_middle" enctype="multipart/form-data" method="post" onsubmit="saveCategory()"> --}}
                <form action="javascript:void(0)" id="categoris_form" class="form-horizontal form_middle" enctype="multipart/form-data" onsubmit="saveCategory()">

                    <div class="modal-body">

                        <input type="hidden" id="id" name="id">


                        <div class="form-group" id="category_name">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="name">ক্যাটাগরি নাম <span
                                    class="text-danger">*</span></label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="text" id="name" required name="name" class="form-control "
                                       data-parsley-length="[3, 40]" data-parsley-trigger="keyup"
                                       placeholder="ক্যাটাগরি এর নাম প্রদান করুন"
                                       data-parsley-error-message="প্রোডাক্ট ক্যাটাগরি এর নাম প্রদান করুন">
                            </div>
                        </div>

                        <div class="form-group" id="cat_pic">
                            <img src="" id="img_preview" alt="" width="50px" height="50px">
                            <label class="control-label col-md-12 col-sm-12 col-xs-12" for="icon">ক্যাটাগরি ছবি</label>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="file" id="icon" onclick="showImg();" name="icon" onchange="imagePreview(this);" class="form-control" accept="image/*" data-parsley-error-message="সাব-ক্যাটাগরি ছবি অবশই jpg,jpge,png হতে হবে  এর নাম প্রদান করুন">
                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-12 col-lg-10">
                                <span id="error_message" style="color: red;"></span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-space btn-danger btn-xs" onclick="closeCategoryModal()">
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
    <script src="{{asset('public/admin/assets/js/custom/category.js')}}"></script>

    <script>
        category_list();
    </script>

@endsection
