<?php

namespace App\Repositories;

use App\Interfaces\AdminRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminRepository implements AdminRepositoryInterface
{
    public function getAll()
    {
        return User::latest()->get();
    }

    public function getById(int $id)
    {
        return User::findOrFail($id);
    }

    public function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'email_verified_at' => now(),
        ]);
    }

    public function update(int $id, array $data)
    {
        $user = User::findOrFail($id);
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];
        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }
        $user->update($updateData);
        return $user;
    }

    public function delete(int $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}