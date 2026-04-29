<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Services\ServiceService;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function __construct(
        protected ServiceService $serviceService
    ) {}

    public function index(): JsonResponse
    {
        $services = $this->serviceService->getAll();

        return response()->json([
            'message' => 'Services retrieved successfully',
            'data' => $services,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $service = $this->serviceService->getById($id);

        return response()->json([
            'message' => 'Service retrieved successfully',
            'data' => $service,
        ]);
    }

    public function store(StoreServiceRequest $request): JsonResponse
    {
        $service = $this->serviceService->create(
            $request->validated(),
            $request->file('image')
        );

        return response()->json([
            'message' => 'Service created successfully',
            'data' => $service,
        ], 201);
    }

    public function update(UpdateServiceRequest $request, int $id): JsonResponse
    {
        $service = $this->serviceService->update(
            $id,
            $request->validated(),
            $request->file('image')
        );

        return response()->json([
            'message' => 'Service updated successfully',
            'data' => $service,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->serviceService->delete($id);

        return response()->json([
            'message' => 'Service deleted successfully',
        ]);
    }
}