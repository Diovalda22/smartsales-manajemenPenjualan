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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('product_category_id');
            $table->unsignedBigInteger('user_id');
            $table->decimal('price', 10, 2);
            $table->integer('stock');
            $table->timestamps();
            $table->softDeletes(); // Menambahkan soft delete (opsional)
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->foreign('product_category_id')->references('id')->on('product_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
