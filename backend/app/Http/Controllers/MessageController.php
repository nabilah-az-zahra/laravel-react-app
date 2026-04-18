<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Services\MessageService;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function __construct(
        protected MessageService $messageService
    ) {}

    public function index(): JsonResponse
    {
        $messages = $this->messageService->getAll();

        return response()->json([
            'message' => 'Messages retrieved successfully',
            'data' => $messages,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $message = $this->messageService->getById($id);

        return response()->json([
            'message' => 'Message retrieved successfully',
            'data' => $message,
        ]);
    }

    public function store(StoreMessageRequest $request): JsonResponse
    {
        $message = $this->messageService->create($request->validated());

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message,
        ], 201);
    }

    public function markAsRead(int $id): JsonResponse
    {
        $message = $this->messageService->markAsRead($id);

        return response()->json([
            'message' => 'Message marked as read',
            'data' => $message,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->messageService->delete($id);

        return response()->json([
            'message' => 'Message deleted successfully',
        ]);
    }
}