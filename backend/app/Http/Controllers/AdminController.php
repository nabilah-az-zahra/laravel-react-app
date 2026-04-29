<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function __construct(
        protected AdminService $adminService
    ) {}

    public function index(): JsonResponse
    {
        $admins = $this->adminService->getAll();

        return response()->json([
            'message' => 'Admins retrieved successfully',
            'data' => $admins,
        ]);
    }

    public function store(StoreAdminRequest $request): JsonResponse
    {
        $admin = $this->adminService->create($request->validated());

        return response()->json([
            'message' => 'Admin created successfully',
            'data' => $admin,
        ], 201);
    }

    public function update(UpdateAdminRequest $request, int $id): JsonResponse
    {
        $admin = $this->adminService->update($id, $request->validated());

        return response()->json([
            'message' => 'Admin updated successfully',
            'data' => $admin,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->adminService->delete($id);

        return response()->json([
            'message' => 'Admin deleted successfully',
        ]);
    }
}