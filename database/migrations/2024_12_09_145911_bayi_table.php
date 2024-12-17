<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("bayi", function (Blueprint $table) {
            $table->id();
            $table->foreignId("akun_id")->constrained("users")->onDelete("cascade");
            $table->string("nik");
            $table->string("nama");
            $table->string("jenisKelamin");
            $table->string("umur");
            $table->integer("bb");
            $table->integer("tb");
            $table->date("tanggalLahir");
            $table->string("namaOrangTua");
            $table->string("nikOrangTua");
            $table->integer("lk");
            $table->integer("ll");
            $table->string("keterangan");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("bayi");
    }
};
