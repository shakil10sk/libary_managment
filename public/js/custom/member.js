
var url = $('meta[name="path"]').attr('content');
var csrf    = $('mata[name = csrf-token]').attr("content");

var member_table;

function member_list()
{
    console.log("hello");

    member_table = $("#member_datatable").DataTable({

        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,

        ajax: {
            url : url + "/member/list_data"

        },

        columns: [
            {
                data: 'DT_RowIndex',

            },
            {
                data: 'name',
            },

        ]
    });
}



    function add_member()
    {
        $("#member_modal").modal('toggle');
        // $('#member_datatable').ajax.reload();
    }

    function closememberModal(){

        $("#member_modal").modal('toggle');
        member_table.ajax.reload();
    }

    function savemember()
    {
        let form_data = new FormData($('#member_form')[0]);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: url + '/member/store',
            type: 'POST',
            data: form_data,
            processData: false,
            contentType: false,
            dataType: 'JSON',
            success: function(response) {

                if (response.status == "success") {

                    $("#member_modal").modal('toggle');
                }
                Swal.fire({
                    title: response.title,
                    text: response.message,
                    type: response.status,
                    buttons: false
                })
                closememberModal();
                // $("#category_datatable").DataTable().draw(true)
            },
        });
    }
