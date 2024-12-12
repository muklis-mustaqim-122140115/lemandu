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
        Schema::create("lansia", function (Blueprint $table) {
            $table->id();
            // nik: string;
            $table->string("nik");
                // nama: string;
            $table->string("name");
                // tanggallahir: string;
            $table->date("tanggallahir");
                // umur: number;
            $table->string("umur");
                // jeniskelamin: "Laki-laki" | "Perempuan";
            $table->string("jeniskelamin");
                // noHp?: string;
            $table->string("noHp");
                // namawali: string;
            $table->string("namawali");
                // telpwali: string;
            $table->string("telpwali");
                // alamat: string;
            $table->string("alamat");
                // bb: number;
            $table->integer("bb");
                // tb: number;
            $table->integer("tb");
                // ll: number;
            $table->integer("ll");
                // lk: number;
            $table->integer("lk");
                // tensi: number;
            $table->integer("tensi");
                // goldar: string;
            $table->string("goldar");
                // keterangan: string;
            $table->string("keterangan");
            $table->timestamps();
            
              
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("lansia");
    }
};
