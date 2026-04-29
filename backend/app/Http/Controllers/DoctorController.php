<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Services\DoctorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function __construct(
        protected DoctorService $doctorService
    ) {}

    public function index(): JsonResponse
    {
        $doctors = $this->doctorService->getAll();

        return response()->json([
            'message' => 'Doctors retrieved successfully',
            'data' => $doctors,
        ]);
    }

    public function getBySpecialization(Request $request): JsonResponse
    {
        $doctors = $this->doctorService->getBySpecialization($request->specialization);

        return response()->json([
            'message' => 'Doctors retrieved successfully',
            'data' => $doctors,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $doctor = $this->doctorService->getById($id);

        return response()->json([
            'message' => 'Doctor retrieved successfully',
            'data' => $doctor,
        ]);
    }

    public function store(StoreDoctorRequest $request): JsonResponse
    {
        $doctor = $this->doctorService->create(
            $request->validated(),
            $request->file('photo')
        );

        return response()->json([
            'message' => 'Doctor created successfully',
            'data' => $doctor,
        ], 201);
    }

    public function update(UpdateDoctorRequest $request, int $id): JsonResponse
    {
        $doctor = $this->doctorService->update(
            $id,
            $request->validated(),
            $request->file('photo')
        );

        return response()->json([
            'message' => 'Doctor updated successfully',
            'data' => $doctor,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->doctorService->delete($id);

        return response()->json([
            'message' => 'Doctor deleted successfully',
        ]);
    }
}