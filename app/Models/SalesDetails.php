<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesDetails extends Model
{
    protected $fillable = ['sales_id', 'product_id', 'user_id', 'quantity', 'unit_price', 'subtotal'];

    public function sales()
    {
        return $this->belongsTo(Sales::class);
    }

    public function product()
    {
        return $this->belongsTo(Products::class);
    }
}
