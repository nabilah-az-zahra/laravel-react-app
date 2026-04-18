<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function __construct(
        protected PostService $postService
    ) {}

    public function index(): JsonResponse
    {
        $posts = $this->postService->getAll();

        return response()->json([
            'message' => 'Posts retrieved successfully',
            'data' => $posts,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $post = $this->postService->getById($id);

        return response()->json([
            'message' => 'Post retrieved successfully',
            'data' => $post,
        ]);
    }

    public function store(StorePostRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $post = $this->postService->create($data, $request->file('image'));

        return response()->json([
            'message' => 'Post created successfully',
            'data' => $post,
        ], 201);
    }

    public function update(UpdatePostRequest $request, int $id): JsonResponse
    {
        $post = $this->postService->update($id, $request->validated(), $request->file('image'));

        return response()->json([
            'message' => 'Post updated successfully',
            'data' => $post,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->postService->delete($id);

        return response()->json([
            'message' => 'Post deleted successfully',
        ]);
    }
}