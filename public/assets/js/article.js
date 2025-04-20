$(document).ready(function () {
    let baseUrl = $("meta[name=app-url]").attr("content");
    let url = baseUrl + "/articles";

    $("#articleTable").DataTable({
        processing: true,
        ajax: url,
        order: [[2, "desc"]],
        columnDefs: [{ className: "dt-center", targets: "_all" }],
        columns: [
            { data: "title" },
            { data: "content" },
            { data: "created_at" },
            {
                data: "action",
                orderable: false,
                searchable: false,
            },
        ],
    });
});
function reloadTable() {
    $("#articleTable").DataTable().ajax.reload();
}
$("#save-article-btn").click(function (e) {
    e.preventDefault();
    if ($("#update_id").val() == null || $("#update_id").val() == "") {
        storeArticle();
    } else {
        updateArticle();
    }
});
function createArticle() {
    $("#alert-div").html("");
    $("#error-div").html("");
    $("#update_id").val("");
    $("#title").val("");
    $("#content").val("");
    $("#form-modal").modal("show");
}
function storeArticle() {
    $("#save-article-btn").prop("disabled", true);
    let url = $("meta[name=app-url]").attr("content");
    let formData = new FormData();
    formData.append("title", $("#title").val());
    formData.append("content", $("#content").val());
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        type: "POST",
        url: url + "/articles",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $("#save-article-btn").prop("disabled", false);
            let successHtml = `<div class="alert alert-success" role="alert">Article Created Successfully</b></div>`;
            $("#alert-div").html(successHtml);
            $("#title").val("");
            $("#content").val("");
            $("#form-modal").modal("hide");
            reloadTable();
        },
        error: function (xhr, status, error) {
            $("#save-article-btn").prop("disabled", false);
            if (xhr.status == 422) {
                let errors = xhr.responseJSON.errors;

                let contentValidation = "";
                if (typeof errors.content !== "undefined") {
                    contentValidation = "<li>" + errors.content[0] + "</li>";
                }
                let titleValidation = "";
                if (typeof errors.title !== "undefined") {
                    titleValidation = "<li>" + errors.title[0] + "</li>";
                }
                let errorHtml =
                    '<div class="alert alert-danger" role="alert">' +
                    "<b>Validation Error!</b>" +
                    "<ul>" +
                    titleValidation +
                    contentValidation +
                    "</ul>" +
                    "</div>";
                $("#error-div").html(errorHtml);
            }
            if (
                xhr.status == 500 ||
                xhr.statusText === "Internal Server Error"
            ) {
                let errorHtml =
                    '<div class="alert alert-danger" role="alert">' +
                    "<b>Server Error!</b>" +
                    "<ul>" +
                    "<li>" +
                    xhr.responseJSON.message +
                    "</li>" +
                    "</ul>" +
                    "</div>";
                $("#error-div").html(errorHtml);
            }
        },
    });
}
function editArticle(id) {
    let url = $("meta[name=app-url]").attr("content");
    $.ajax({
        type: "GET",
        url: url + "/articles/" + id + "/edit",
        success: function (data) {
            $("#alert-div").html("");
            $("#error-div").html("");
            $("#update_id").val(data.article.id);
            $("#title").val(data.article.title);
            $("#content").val(data.article.content);
            $("#form-modal").modal("show");
        },
        error: function (xhr) {
            console.log(xhr.responseJSON);
        },
    });
}
function updateArticle() {
    $("#save-article-btn").prop("disabled", true);
    let url = $("meta[name=app-url]").attr("content");
    let data = {
        title: $("#title").val(),
        content: $("#content").val(),
    };
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        type: "PUT",
        url: url + "/articles/" + $("#update_id").val(),
        data: data,
        success: function (data) {
            $("#save-article-btn").prop("disabled", false);
            let successHtml =
                '<div class="alert alert-success" role="alert"><b>Article Updated Successfully</b></div>';
            $("#alert-div").html(successHtml);
            $("#title").val("");
            $("#content").val("");
            $("#form-modal").modal("hide");
            reloadTable();
        },
        error: function (xhr, status, error) {
            $("#save-article-btn").prop("disabled", false);
            if (xhr.status == 422) {
                let errors = xhr.responseJSON.errors;

                let contentValidation = "";
                if (typeof errors.content !== "undefined") {
                    contentValidation = "<li>" + errors.content[0] + "</li>";
                }
                let titleValidation = "";
                if (typeof errors.title !== "undefined") {
                    titleValidation = "<li>" + errors.title[0] + "</li>";
                }
                let errorHtml =
                    '<div class="alert alert-danger" role="alert">' +
                    "<b>Validation Error!</b>" +
                    "<ul>" +
                    titleValidation +
                    contentValidation +
                    "</ul>" +
                    "</div>";
                $("#error-div").html(errorHtml);
            }
            if (
                xhr.status == 500 ||
                xhr.statusText === "Internal Server Error"
            ) {
                let errorHtml =
                    '<div class="alert alert-danger" role="alert">' +
                    "<b>Server Error!</b>" +
                    "<ul>" +
                    "<li>" +
                    xhr.responseJSON.message +
                    "</li>" +
                    "</ul>" +
                    "</div>";
                $("#error-div").html(errorHtml);
            }
        },
    });
}
function showArticle(id) {
    $("#title-info").html("");
    $("#content-info").html("");
    let url = $("meta[name=app-url]").attr("content");
    $.ajax({
        type: "GET",
        url: url + "/articles/" + id,
        success: function (data) {
            $("#title-info").html(data.article.title);
            $("#content-info").html(data.article.content);
            $("#view-modal").modal("show");
        },
    });
}
function destroyArticle(id) {
    swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonColor: "#d33",
    }).then((result) => {
        if (result.value) {
            let url = $("meta[name=app-url]").attr("content");
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                type: "DELETE",
                url: url + "/articles/" + id,
                success: function (data) {
                    if (data.status === "success") {
                        swal.fire({
                            title: "Success",
                            text: "Article deleted successfully",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(() => {
                            reloadTable();
                        });
                    } else {
                        swal.fire("Error!", "Something went wrong", "error");
                    }
                },
            });
        }
    });
}
