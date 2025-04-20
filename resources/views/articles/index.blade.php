@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-between mb-3">
        <h2>Article List Using Laravel 12 Yajra DataTables</h2>
        <a class="btn btn-primary" onclick="createArticle()">Create Post</a>
    </div>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    <div id="alert-div">

    </div>
    <table class="table table-bordered display" id="articleTable">
        <thead>
            <tr>
                <th>Title</th>
                <th>Article</th>
                <th>Created At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="article-table-body"></tbody>
    </table>
    <!-- article form modal -->
    <div class="modal" tabindex="-1" role="dialog" id="form-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Article Form</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="error-div"></div>
                    <form>
                        <input type="hidden" name="update_id" id="update_id">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" name="title">
                        </div>
                        <div class="form-group">
                            <label for="content">Article</label>
                            <textarea class="form-control" id="content" rows="3" name="content"></textarea>
                        </div>
                        <button type="submit" class="btn btn-outline-primary mt-3" id="save-article-btn">Save
                            Article</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- view article modal -->
<div class="modal " tabindex="-1" role="dialog" id="view-modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Article Information</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <b>Title:</b>
          <p id="title-info"></p>
          <b>Article:</b>
          <p id="content-info"></p>
        </div>
      </div>
    </div>
  </div>
@endsection
@section('scripts')
<script src="{{asset('assets/js/article.js')}}"></script>
@endsection
