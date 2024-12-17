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
        Schema::create("ibu_hamil", function (Blueprint $table) {
            $table->id();
            $table->foreignId("akun_id");
            $table->string("nik");
            $table->string("name");
            // tanggallahir: string;
            $table->date("tanggallahir");
            //   niksuami: string;
            $table->string("niksuami");
            //   namasuami: string;
            $table->string("namasuami");
            //   umur: number;
            $table->string("umur");
            //   telepon: string;
            $table->string("telepon");
            //   alamat: string;
            $table->string("alamat");
            //   bbsebelum: number;
            $table->integer("bbsebelum");
            //   bbsesudah: number;
            $table->integer("bbsesudah");
            //   tb: number;
            $table->integer("tb");
            //   goldar: number;
            $table->string("goldar");
            //   hemoglobin: number;
            $table->integer("hemoglobin");
            //   tinggifundus: number;
            $table->integer("tinggifundus");
            //   jadwallahir: string;
            $table->string("jadwallahir");
            //   keluhan: string;
            $table->string("keluhan");
            //   keterangan: string;
            $table->string("keterangan");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("ibu_hamil");
    }
};
