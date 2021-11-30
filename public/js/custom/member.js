
var url = $('meta[name="path"]').attr('content');
var csrf    = $('mata[name = csrf-token]').attr("content");

var member_table;

function member_list()
{

    member_table = $("#member_datatable").DataTable({

        scrollCollapse: true,
        autoWidth: false,
        responsive: true,
        serverSide: true,
        processing: true,
        ajax: {
            url : url + "/member/list_data",
            dataType: "JSON",
                type: "get",
        },

        columns: [
            {
                data: null,
                render: function(){
                    return member_table.page.info().start + member_table.column(0).nodes().length;
                }
            },
            {
                data: 'name',
            },
            {
                data: 'age',
            },
            {
                data: 'nid',
            },
            {
                data: 'school_name',
                // data: null,
            },
            {
                data: 'address',
            },
            {
                data: 'status',
            },
            {
                data: null,
                render: function(data, type, row, meta) {
                    let html = '';
                    html = "<a href='javascript:void(0)' id='edit' class='btn btn-warning btn-xs  m-1'" +
                        " onclick='member_edit(" + meta.row + ")' ><i class='fa fa-edit' ></i> এডিট</a>" +
                        " <a href='javascript:void(0)' class='btn btn-danger btn-xs btndelete'" +
                        " onclick='delete_member(" + meta.row + ")' ><i class='fa fa-trash' ></i> ডিলিট</a>";
                    return html;
                }
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

                member_table.ajax.reload();
                // $("#category_datatable").DataTable().draw(true)
            },
        });
    }
