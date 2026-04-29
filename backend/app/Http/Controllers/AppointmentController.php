<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Services\AppointmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function __construct(
        protected AppointmentService $appointmentService
    ) {}

    public function index(): JsonResponse
    {
        $appointments = $this->appointmentService->getAll();

        return response()->json([
            'message' => 'Appointments retrieved successfully',
            'data' => $appointments,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $appointment = $this->appointmentService->getById($id);

        return response()->json([
            'message' => 'Appointment retrieved successfully',
            'data' => $appointment,
        ]);
    }

    public function store(StoreAppointmentRequest $request): JsonResponse
    {
        $appointment = $this->appointmentService->create($request->validated());

        return response()->json([
            'message' => 'Appointment booked successfully',
            'data' => $appointment,
        ], 201);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $appointment = $this->appointmentService->updateStatus($id, $request->status);

        return response()->json([
            'message' => 'Appointment status updated successfully',
            'data' => $appointment,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->appointmentService->delete($id);

        return response()->json([
            'message' => 'Appointment deleted successfully',
        ]);
    }
}