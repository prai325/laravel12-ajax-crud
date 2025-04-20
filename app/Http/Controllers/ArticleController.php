<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Yajra\DataTables\Facades\DataTables;
use App\Services\ArticleService;

class ArticleController extends Controller
{
    protected $articleService;
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $articles = $this->articleService->listArticle();
            return DataTables::of($articles)
                ->addColumn('action', function ($article) {
                    return "
                    <button
                        class='btn btn-outline-info'
                        onclick='showArticle({$article->id})'>Show
                    </button>
                    <button
                        class='btn btn-outline-success'
                        onclick='editArticle({$article->id})'>Edit
                    </button>
                    <button
                        class='btn btn-outline-danger'
                        onclick='destroyArticle({$article->id})'>Delete
                    </button>";
                })
                ->addColumn('created_at', function ($article) {
                    return $article->created_at->format('m-d-Y');
                })
                ->rawColumns([
                    'action',
                    'created_at'
                ])
                ->make(true);
        }
        return view('articles.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $this->articleService->createArticle($request->all());
        return response()->json(['status' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $article = $this->articleService->getArticle($id);
        return response()->json(['status' => 'success', 'article' => $article]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $article = $this->articleService->getArticle($id);
        return response()->json(['status' => 'success', 'article' => $article]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $this->articleService->updateArticle($id, $request->all());
        return response()->json(['status' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->articleService->deleteArticle($id);
        return response()->json(['status' => 'success']);
    }
}
