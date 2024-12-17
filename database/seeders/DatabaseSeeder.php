<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $user = [
            [
                "name"=> "Lematang Atas",
                "email"=> "lematangatas@gmail.com",
                "password"=> Hash::make("lematangatasmaju"),
            ],
            [
                "name"=> "Lematang Bawah",
                "email"=> "lematangbawah@gmail.com",
                "password"=> Hash::make("lematangbawahbisa"),
            ],
            [
                "name"=> "Lematang Sari",
                "email"=> "lematangsarih@gmail.com",
                "password"=> Hash::make("lematangsarisehat"),
            ],
            [
                "name"=> "Lubuk Bais",
                "email"=> "lubukbais@gmail.com",
                "password"=> Hash::make("lubukbaisjaya"),
            ],
            [
                "name"=> "Mojo Songo",
                "email"=> "mojosongo@gmail.com",
                "password"=> Hash::make("mojosongosiap"),    
            ],
            [
                "name"=> "Rilau Gadis",
                "email"=> "rilaugadis@gmail.com",
                "password"=> Hash::make("rilaugadisberseri"),    
            ],
            [
                "name"=> "Kampung Sawah",
                "email"=> "kampungsawah@gmail.com",
                "password"=> Hash::make("kampungsawahsejahtera"),    
            ],
            [
                "name"=> "Jalan Baru",
                "email"=> "jalanbaru@gmail.com",
                "password"=> Hash::make("jalanbarulancar"),    
            ]
            ];
        User::query()->insert($user);
    }
}
