$(document).ready(function () {
    show_bucket();
});
function show_bucket(){
    $.ajax({
        type: "GET",
        url: "/bucket",
        data: {},
        success: function (response) {
            let rows = response['buckets']
            for (let i = 0; i < rows.length; i++) {
                let bucket = rows[i]['bucket']
                let done = rows[i]['done']
                let num = rows[i]['num']

                let temp_html = ``
                if (done == 0) {
                    temp_html = `<li>
                                            <h2>✅ ${bucket}</h2>
                                            <button onclick="done_bucket(${num})" type="button" class="btn btn-outline-primary">완료!</button>
                                            <button id="delete" onclick="bucket_delete(${num})" type="button" class="btn btn-outline-danger">삭제</button>

                                        </li>`
                } else {
                    temp_html = `<li>
                                            <h2 class="done">✅ ${bucket}</h2>
                                            <button type="button" id="cancel" onclick="cancel_done(${num})" class="btn btn-light">취소</button>
                                            <button id="delete" onclick="bucket_delete(${num})" type="button" class="btn btn-outline-danger">삭제</button>
                                        </li>`
                }
                $('#bucket-list').append(temp_html);
            }
        }
    });
}
function save_bucket(){
    let bucket = $('#bucket').val();

    if (bucket === '') {
        $(".showBucket").addClass('errorValue');
        $("#bucket").addClass('errorValue2');
    } else {
        $.ajax({
            type: "POST",
            url: "/bucket",
            data: {bucket_give: bucket},
            success: function (response) {
                alert(response["msg"])
                window.location.reload()
            }
        });
    }
}

function done_bucket(num){
    $.ajax({
        type: "POST",
        url: "/bucket/done",
        data: {num_give:num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload();
        }
    });
}

function cancel_done(num) {
    $.ajax({
        type: "POST",
        url: "/bucket/cancel",
        data: {num_give:num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload();
        }
    });
}

function bucket_delete(num) {
    $.ajax({
        type: "POST",
        url: "/bucket/delete",
        data: {num_give:num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload();
        }
    });
}
