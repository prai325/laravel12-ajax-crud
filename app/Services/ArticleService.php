<?php

namespace App\Services;

use App\Models\Article;

class ArticleService
{
    public function listArticle()
    {
        $articles = Article::latest()->get();
        return $articles;
    }
    public function createArticle(array $request)
    {
        $article = Article::create($request);
        return $article;
    }
    public function getArticle($id)
    {
        $article = Article::findOrFail($id);
        return $article;
    }
    public function updateArticle($id, array $request)
    {
        $article = Article::findOrFail($id);
        $article->update($request);
        return $article;
    }
    public function deleteArticle($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
    }
}

