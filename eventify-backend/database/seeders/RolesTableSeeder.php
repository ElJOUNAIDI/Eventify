<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Laratrust\Models\Role;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        Role::firstOrCreate(
            ['name' => 'admin'],
            ['display_name' => 'Administrator']
        );

        Role::firstOrCreate(
            ['name' => 'organizer'],
            ['display_name' => 'Organizer']
        );

        Role::firstOrCreate(
            ['name' => 'user'],
            ['display_name' => 'User']
        );
    }
}
