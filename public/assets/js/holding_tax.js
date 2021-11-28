// global
var url = $('meta[name = path]').attr("content");
var csrf = $('meta[name = csrf-token]').attr("content");
var rent_row = 0;


// ==== assessment ========= //
function addRent() {
    let rent_description = $("#rent_description_" + rent_row).val();
    let rent_no = $("#rent_no_" + rent_row).val();
    let description = $("#description_" + rent_row).val();
    let owner = $("#owner_" + rent_row).val();
    let ground = $("#ground_" + rent_row).val();
    let total_floor = $("#total_floor_" + rent_row).val();
    let height = $("#height_" + rent_row).val();
    let weight = $("#weight_" + rent_row).val();
    let squre_feet = $("#squre_feet_" + rent_row).val();
    let sqft_rent = $("#sqft_rent_" + rent_row).val();

    if (!rent_description || !rent_no || !description || !owner || !ground || !total_floor || !height || !weight || !squre_feet || !sqft_rent) {
        $("#rent_error").text("সকল তথ্য পুরণ করুন");
        return false;
    } else {
        $("#rent_error").text("");
    }

    addRow();


}

function addRow() {

    rent_row++;

    let rendar = `<tr id="row_no_${rent_row}" >
                      <td><input type="text" class="form-control" name="rent_description[]"
                                                 id="rent_description_${rent_row}"  /></td>
                      <td><input type="text" class="form-control" name="rent_no[]"
                                                id="rent_no_${rent_row}"  /></td>
                      <td><input type="text" class="form-control" name="description[]"
                                                id="description_${rent_row}"  /></td>
                      <td><input type="text" class="form-control" name="owner[]"
                                               id="owner_${rent_row}"  /></td>
                      <td><input type="text" class="form-control" name="ground[]"
                                                id="ground_${rent_row}"  /></td>
                      <td><input type="text" class="form-control" name="total_floor[]" onkeyup="RentCalculate(rent_row)"
                                           id="total_floor_${rent_row}"/></td>
                      <td><input type="text" class="form-control" name="height[]" onkeyup="RentCalculate(rent_row)"
                                           id="height_${rent_row}"/></td>
                      <td><input type="text" class="form-control" name="weight[]" onkeyup="RentCalculate(rent_row)"
                                           id="weight_${rent_row}"/></td>
                      <td><input type="text" class="form-control" name="squre_feet[]"
                                           id="squre_feet_${rent_row}" placeholder="0.00" readonly /></td>
                      <td><input type="text" class="form-control" name="sqft_rent[]" onkeyup="RentCalculate(rent_row)"
                                           id="sqft_rent_${rent_row}"/></td>
                      <td><input type="text" class="form-control total-rent" name="total_rent_amount[]"
                                               id="total_rent_amount_${rent_row}" readonly placeholder="0.00"  /></td>
                      <td><button type="button"  class="btn btn-danger btn-xs" onclick="removeRow(rent_row)"><i class="fa fa-trash" ></i></button> </td>
               </tr>`;

    $("#assessment_section").append(rendar);
}

function removeRow(index) {
    $("#row_no_" + index).remove();

    getTotalCosts();
}

function RentCalculate(index) {

    let total_floor = +$("#total_floor_" + index).val() || 0;
    let height = +$("#height_" + index).val() || 0;
    let weight = +$("#weight_" + index).val() || 0;
    let per_sqft_rent = +$("#sqft_rent_" + index).val() || 0;
    let total_squre_fit = total_floor * (height * weight);
    let total_rent_amount = (total_squre_fit * per_sqft_rent);

    if ($("#owner_type").val() == 1) {
        total_rent_amount *= 12;
    }

    $("#squre_feet_" + index).val(total_squre_fit.toFixed(2));
    $("#total_rent_amount_" + index).val(total_rent_amount.toFixed(2));

    getTotalCosts();

    taxDetermination();

}

function getTotalCosts() {
    let total = 0;
    $(".total-rent").each(function () {
        total += +$(this).val() || 0;
    })
    $("#total_cost").val(total.toFixed(2));

    emarotCalculate($("#owner_type").val())
}

function changeOwnerType(type) {

    let [total_cost_label, assessment_type] = type == 1 ? ["মোট ভাড়া", "ভাড়ার"] : ["নির্মাণ খরচ", "নির্মাণ"];

    if (type == 1) {

        $(".emarot-rent").each(function () {
            $(this).removeClass('d-none');
        })

        $(".emarot-build").each(function () {
            $(this).addClass('d-none');
        })

    } else {

        $(".emarot-rent").each(function () {
            $(this).addClass('d-none');
        })

        $(".emarot-build").each(function () {
            $(this).removeClass('d-none');
        })
    }

    $("#assessment_type").text(assessment_type);
    $("#total_cost_label").text(total_cost_label);
}

function emarotCalculate(type = 1) {

    let assessment_fee = +$("#total_cost").val();

    if (type == 1) {
        $("#12_month_rent").val(assessment_fee);

        let maintenance_fee = (assessment_fee / 12) * 2;

        $("#maintenance_fee").val(maintenance_fee.toFixed(2));

        assessment_fee -= maintenance_fee;

        $("#without_maintenance_fee_rent").val(assessment_fee.toFixed(2));

    } else {
        $("#build_cost").val(assessment_fee);


        assessment_fee -= (assessment_fee * 7.5) / 100; // 7.5% build cost fee minus


        $("#seven_percent_cost_fee").val(assessment_fee.toFixed(2));

        let total_area = +$("#total_area").val();
        let tax_rate = +$("#tax_rate").val();

        let payable_tax = (total_area * tax_rate);

        $("#payable_tax").val(payable_tax.toFixed(2));

        assessment_fee += payable_tax;

        $("#due_payable_with_assessment_fee").val(assessment_fee.toFixed(2))

        let maintenance_fee = (assessment_fee / 6);

        $("#construction_maintenance_cost").val(maintenance_fee.toFixed(2));

        console.log(assessment_fee, maintenance_fee)

        assessment_fee -= maintenance_fee;

        $("#without_maintenance_fee_rent").val(assessment_fee.toFixed(2));

    }

    let onefourth_fee = (assessment_fee / 4);

    $("#One_Fourth_fee").val(onefourth_fee.toFixed(2));

    assessment_fee -= onefourth_fee;

    $("#without_One_Fourth_fee_rent").val(assessment_fee.toFixed(2));

    let interest_fee = +$("#interest_fee").val();

    assessment_fee -= interest_fee;

    $("#total_annual_assessment_fee").val(assessment_fee.toFixed(2));

}

var Payable_tax = 0;

function taxDetermination(tax_type = '') {
    let total_assessment_fee = +$("#total_annual_assessment_fee").val();

    let tax_type_array = ['holding_tax', 'garbase_dispose', 'lighting', 'water'];

    if (tax_type == '') {

        tax_type_array.forEach(function (type) {
            let tax_rate = +$("#" + type + "_rate").val();
            let total_tax = (total_assessment_fee * tax_rate) / 100;
            $("#" + type + "_amount").val(total_tax.toFixed(2));
        })
        totalTaxCalculate();

        return;
    }

    let tax_rate = +$("#" + tax_type + "_rate").val();
    let total_tax = (total_assessment_fee * tax_rate) / 100;
    $("#" + tax_type + "_amount").val(total_tax.toFixed(2));

    totalTaxCalculate();

}

function disabledTaxSection(tax_type, value) {

    if (value == 1) {
        $("#" + tax_type + "_rate").removeAttr('disabled', true);
    } else {
        $("#" + tax_type + "_rate").attr('disabled', true);
        $("#" + tax_type + "_rate").val('');
    }
}


function totalTaxCalculate() {
    let tax_total = 0;

    $(".tax-amount").each(function () {
        tax_total += +$(this).val() || 0;
    })
    $("#total_payable_tax_amount").val(tax_total.toFixed(2));
}


// ==== assessment ========= //

function set_ward_name(id) {
    $("#ward_name").val(ward_list[id]);
}

function calculateTotalArea(rent_area, own_area) {
    var total_area = +rent_area + +own_area;
    $("#total_area").val(total_area);

    holdingTaxCalculation($("#property_type").val());
}

function holdingTaxCalculation(property_id) {
    var tax_rate = parseInt(property_list[property_id]) || 0;
    $("#tax_rate").val(tax_rate);

    var total_area = $("#total_area").val();

    var arv = total_area * tax_rate;

    var annual_tax = arv;
    var monthly_tax = Math.round(annual_tax / 12);

    $("#annual_rental_value").val(arv);
    $("#final_annual_rental_value").val(arv);

    $("#annual_tax").val(annual_tax);
    $("#monthly_tax").val(monthly_tax);

}

var data_tbl;

function assessment_list() {
    data_tbl = $('#data_tbl').DataTable({
        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: url + '/holding/tax/assessment',
        columns: [
            {
                data: null,
                render: function () {
                    return data_tbl.page.info().start + data_tbl.column(0).nodes().length;
                },
                orderable: false,
                searchable: false
            },
            {data: "name"},
            {data: "mobile_no"},
            {data: "holding_no"},
            {data: "ward_name"},
            {data: "property_name"},
            {data: "owner_type"},
            {data: "yearly_tax"},
            {data: "monthly_tax"},
            {data: "nid"},
            {data: "action"}
        ]
    });
}

function deleteAssessment(pid) {
    swal({
        title: "অনুমোদন",
        text: "আপনি কি ডিলিট করতে চান ?",
        type: "warning",
        showConfirmButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "হ্যাঁ",
        showCancelButton: true,
        cancelButtonText: "না",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            $.ajax({
                url: url + '/holding/tax/assessment/delete',
                type: "POST",
                dataType: "JSON",
                data: {
                    pid: pid,
                    _token: csrf
                },
                success: function (response) {
                    swal({
                        title: "Response",
                        text: response.message,
                        type: response.status,
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        allowEscapeKey: false
                    });

                    data_tbl.ajax.reload();
                }
            });
        }
    });
}

function holding_bill_list() {
    data_tbl = $('#data_tbl').DataTable({
        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: url + '/holding/tax/bill/list',
        columns: [
            {
                data: null,
                render: function () {
                    return data_tbl.page.info().start + data_tbl.column(0).nodes().length;
                },
                orderable: false,
                searchable: false
            },
            {data: "name"},
            {data: "mobile_no"},
            {data: "holding_no"},
            {data: "ward_name"},
            {data: "invoice_id"},
            {data: "voucher_no"},
            {data: "amount"},
            {data: "is_paid"},
            {data: "created_at"},
            {data: "action"}
        ]
    });
}

function deleteHoldingBill(invoice_id) {
    swal({
        title: "অনুমোদন",
        text: "আপনি কি ডিলিট করতে চান ?",
        type: "warning",
        showConfirmButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "হ্যাঁ",
        showCancelButton: true,
        cancelButtonText: "না",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            $.ajax({
                url: url + '/holding/tax/bill/delete',
                type: "POST",
                dataType: "JSON",
                data: {
                    invoice_id: invoice_id,
                    _token: csrf
                },
                success: function (response) {
                    swal({
                        title: "Response",
                        text: response.message,
                        type: response.status,
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        allowEscapeKey: false
                    });

                    data_tbl.ajax.reload();
                }
            });
        }
    });
}

// ward settings
var data_tbl;

function ward_list() {
    data_tbl = $('#data_tbl').DataTable({
        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: url + '/holding/tax/settings/ward',
        columns: [
            {
                data: null,
                render: function () {
                    return data_tbl.page.info().start + data_tbl.column(0).nodes().length;
                },
                orderable: false,
                searchable: false
            },
            {data: "ward_no"},
            {data: "name"},
            {
                data: null,
                render: function (data, type, row, meta) {
                    return '<button class="btn btn-sm btn-primary" onclick="editWard(' + meta.row + ')"><i class="fa fa-pencil"></i> Edit</button>&nbsp' + data.action;
                }
            }
        ]
    });
}

function addNewWard() {

    $("#ward_no").val('');
    $("#ward_name").val('');

    $("#action_btn").html("Save");
    $("#action_btn").attr("onclick", "saveWard()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function saveWard() {
    var ward_no = $("#ward_no").val();
    var ward_name = $("#ward_name").val();

    var error_status = false;

    if (ward_no == '') {
        $("#ward_no_error").html('Empty ward no');
        error_status = true;
    } else {
        $("#ward_no_error").html('');
    }

    if (ward_name == '') {
        $("#ward_name_error").html('Empty ward name');
        error_status = true;
    } else {
        $("#ward_name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/ward/store',
            type: "POST",
            dataType: "JSON",
            data: {
                ward_no: ward_no,
                ward_name: ward_name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function editWard(row_id) {
    var data = data_tbl.row(row_id).data();

    $("#pid").val(data.id);
    $("#ward_no").val(data.ward_no);
    $("#ward_name").val(data.name);

    $("#action_btn").html("Update");
    $("#action_btn").attr("onclick", "updateWard()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function updateWard() {
    var pid = $("#pid").val();
    var ward_no = $("#ward_no").val();
    var ward_name = $("#ward_name").val();

    var error_status = false;

    if (ward_no == '') {
        $("#ward_no_error").html('Empty ward no');
        error_status = true;
    } else {
        $("#ward_no_error").html('');
    }

    if (ward_name == '') {
        $("#ward_name_error").html('Empty ward name');
        error_status = true;
    } else {
        $("#ward_name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/ward/update',
            type: "POST",
            dataType: "JSON",
            data: {
                pid: pid,
                ward_no: ward_no,
                ward_name: ward_name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function deleteWard(pid) {
    swal({
        title: "অনুমোদন",
        text: "আপনি কি ডিলিট করতে চান ?",
        type: "warning",
        showConfirmButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "হ্যাঁ",
        showCancelButton: true,
        cancelButtonText: "না",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            $.ajax({
                url: url + '/holding/tax/settings/ward/delete',
                type: "POST",
                dataType: "JSON",
                data: {
                    pid: pid,
                    _token: csrf
                },
                success: function (response) {
                    swal({
                        title: "Response",
                        text: response.message,
                        type: response.status,
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        allowEscapeKey: false
                    });

                    data_tbl.ajax.reload();
                }
            });
        }
    });
}

// moholla settings
var data_tbl;

function moholla_list() {
    data_tbl = $('#data_tbl').DataTable({
        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: url + '/holding/tax/settings/moholla',
        columns: [
            {
                data: null,
                render: function () {
                    return data_tbl.page.info().start + data_tbl.column(0).nodes().length;
                },
                orderable: false,
                searchable: false
            },
            {data: "name"},
            {
                data: null,
                render: function (data, type, row, meta) {
                    return '<button class="btn btn-sm btn-primary" onclick="editMoholla(' + meta.row + ')"><i class="fa fa-pencil"></i> Edit</button>&nbsp' + data.action;
                }
            }
        ]
    });
}

function addNewMoholla() {

    $("#name").val('');

    $("#action_btn").html("Save");
    $("#action_btn").attr("onclick", "saveMoholla()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function saveMoholla() {
    var name = $("#name").val();

    var error_status = false;

    if (name == '') {
        $("#name_error").html('Empty name');
        error_status = true;
    } else {
        $("#name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/moholla/store',
            type: "POST",
            dataType: "JSON",
            data: {
                name: name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function editMoholla(row_id) {
    var data = data_tbl.row(row_id).data();

    $("#pid").val(data.id);
    $("#name").val(data.name);

    $("#action_btn").html("Update");
    $("#action_btn").attr("onclick", "updateMoholla()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function updateMoholla() {
    var pid = $("#pid").val();
    var name = $("#name").val();

    var error_status = false;

    if (name == '') {
        $("#name_error").html('Empty name');
        error_status = true;
    } else {
        $("#name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/moholla/update',
            type: "POST",
            dataType: "JSON",
            data: {
                pid: pid,
                name: name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function deleteMoholla(pid) {
    swal({
        title: "অনুমোদন",
        text: "আপনি কি ডিলিট করতে চান ?",
        type: "warning",
        showConfirmButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "হ্যাঁ",
        showCancelButton: true,
        cancelButtonText: "না",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            $.ajax({
                url: url + '/holding/tax/settings/moholla/delete',
                type: "POST",
                dataType: "JSON",
                data: {
                    pid: pid,
                    _token: csrf
                },
                success: function (response) {
                    swal({
                        title: "Response",
                        text: response.message,
                        type: response.status,
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        allowEscapeKey: false
                    });

                    data_tbl.ajax.reload();
                }
            });
        }
    });
}

// block settings
var data_tbl;

function block_list() {
    data_tbl = $('#data_tbl').DataTable({
        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: url + '/holding/tax/settings/block',
        columns: [
            {
                data: null,
                render: function () {
                    return data_tbl.page.info().start + data_tbl.column(0).nodes().length;
                },
                orderable: false,
                searchable: false
            },
            {data: "name"},
            {
                data: null,
                render: function (data, type, row, meta) {
                    return '<button class="btn btn-sm btn-primary" onclick="editBlock(' + meta.row + ')"><i class="fa fa-pencil"></i> Edit</button>&nbsp' + data.action;
                }
            }
        ]
    });
}

function addNewBlock() {

    $("#name").val('');

    $("#action_btn").html("Save");
    $("#action_btn").attr("onclick", "saveBlock()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function saveBlock() {
    var name = $("#name").val();

    var error_status = false;

    if (name == '') {
        $("#name_error").html('Empty name');
        error_status = true;
    } else {
        $("#name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/block/store',
            type: "POST",
            dataType: "JSON",
            data: {
                name: name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function editBlock(row_id) {
    var data = data_tbl.row(row_id).data();

    $("#pid").val(data.id);
    $("#name").val(data.name);

    $("#action_btn").html("Update");
    $("#action_btn").attr("onclick", "updateBlock()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function updateBlock() {
    var pid = $("#pid").val();
    var name = $("#name").val();

    var error_status = false;

    if (name == '') {
        $("#name_error").html('Empty name');
        error_status = true;
    } else {
        $("#name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/block/update',
            type: "POST",
            dataType: "JSON",
            data: {
                pid: pid,
                name: name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function deleteBlock(pid) {
    swal({
        title: "অনুমোদন",
        text: "আপনি কি ডিলিট করতে চান ?",
        type: "warning",
        showConfirmButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "হ্যাঁ",
        showCancelButton: true,
        cancelButtonText: "না",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            $.ajax({
                url: url + '/holding/tax/settings/block/delete',
                type: "POST",
                dataType: "JSON",
                data: {
                    pid: pid,
                    _token: csrf
                },
                success: function (response) {
                    swal({
                        title: "Response",
                        text: response.message,
                        type: response.status,
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        allowEscapeKey: false
                    });

                    data_tbl.ajax.reload();
                }
            });
        }
    });
}

// property type settings
var data_tbl;

function property_type_list() {
    data_tbl = $('#data_tbl').DataTable({
        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: url + '/holding/tax/settings/property_type',
        columns: [
            {
                data: null,
                render: function () {
                    return data_tbl.page.info().start + data_tbl.column(0).nodes().length;
                },
                orderable: false,
                searchable: false
            },
            {data: "name"},
            {
                data: null,
                render: function (data, type, row, meta) {
                    return '<button class="btn btn-sm btn-primary" onclick="editPropertyType(' + meta.row + ')"><i class="fa fa-pencil"></i> Edit</button>&nbsp' + data.action;
                }
            }
        ]
    });
}

function addNewPropertyType() {

    $("#name").val('');

    $("#action_btn").html("Save");
    $("#action_btn").attr("onclick", "savePropertyType()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function savePropertyType() {
    var name = $("#name").val();

    var error_status = false;

    if (name == '') {
        $("#name_error").html('Empty name');
        error_status = true;
    } else {
        $("#name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/property_type/store',
            type: "POST",
            dataType: "JSON",
            data: {
                name: name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function editPropertyType(row_id) {
    var data = data_tbl.row(row_id).data();

    $("#pid").val(data.id);
    $("#name").val(data.name);

    $("#action_btn").html("Update");
    $("#action_btn").attr("onclick", "updatePropertyType()");

    $("#data_modal").modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function updatePropertyType() {
    var pid = $("#pid").val();
    var name = $("#name").val();

    var error_status = false;

    if (name == '') {
        $("#name_error").html('Empty name');
        error_status = true;
    } else {
        $("#name_error").html('');
    }

    if (!error_status) {
        $.ajax({
            url: url + '/holding/tax/settings/property_type/update',
            type: "POST",
            dataType: "JSON",
            data: {
                pid: pid,
                name: name,
                _token: csrf
            },
            success: function (response) {
                swal({
                    title: "Response",
                    text: response.message,
                    type: response.status,
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    allowEscapeKey: false
                });

                $("#data_modal").modal('hide');

                data_tbl.ajax.reload();
            }
        });
    }
}

function deletePropertyType(pid) {
    swal({
        title: "অনুমোদন",
        text: "আপনি কি ডিলিট করতে চান ?",
        type: "warning",
        showConfirmButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "হ্যাঁ",
        showCancelButton: true,
        cancelButtonText: "না",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            $.ajax({
                url: url + '/holding/tax/settings/property_type/delete',
                type: "POST",
                dataType: "JSON",
                data: {
                    pid: pid,
                    _token: csrf
                },
                success: function (response) {
                    swal({
                        title: "Response",
                        text: response.message,
                        type: response.status,
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        allowEscapeKey: false
                    });

                    data_tbl.ajax.reload();
                }
            });
        }
    });
}
