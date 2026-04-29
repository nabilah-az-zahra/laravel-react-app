<?php

namespace App\Providers;

use App\Interfaces\AdminRepositoryInterface;
use App\Interfaces\AppointmentRepositoryInterface;
use App\Interfaces\AuthRepositoryInterface;
use App\Interfaces\DoctorRepositoryInterface;
use App\Interfaces\MessageRepositoryInterface;
use App\Interfaces\PostRepositoryInterface;
use App\Interfaces\ServiceRepositoryInterface;
use App\Repositories\AdminRepository;
use App\Repositories\AppointmentRepository;
use App\Repositories\AuthRepository;
use App\Repositories\DoctorRepository;
use App\Repositories\MessageRepository;
use App\Repositories\PostRepository;
use App\Repositories\ServiceRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AdminRepositoryInterface::class, AdminRepository::class);
        $this->app->bind(AppointmentRepositoryInterface::class, AppointmentRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(DoctorRepositoryInterface::class, DoctorRepository::class);
        $this->app->bind(MessageRepositoryInterface::class, MessageRepository::class);
        $this->app->bind(PostRepositoryInterface::class, PostRepository::class);
        $this->app->bind(ServiceRepositoryInterface::class, ServiceRepository::class);
    }

    public function boot(): void
    {
        //
    }
}