$(document).ready(function() {



var url = $('meta[name="path"]').attr('content');

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
    console.log("done");
}

});
