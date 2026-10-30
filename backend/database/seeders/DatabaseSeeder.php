<?php

namespace Database\Seeders;

use App\Models\TypeUser;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = TypeUser::firstOrCreate(['label' => 'Administrateur']);
        TypeUser::firstOrCreate(['label' => 'Colaborateur']);

        // Compte de démonstration pour un usage local uniquement
        $user = User::firstOrNew(['email' => env('ADMIN_EMAIL', 'admin@example.com')]);
        $user->fill([
            'name' => 'Admin',
            'prenom' => 'Demo',
            'cin' => 'DEMO0001',
            'password' => Hash::make(env('ADMIN_PASSWORD', 'admin1234')),
            'restraction' => false,
        ]);
        $user->typeUserIdType = $admin->id_type;
        $user->save();
    }
}
