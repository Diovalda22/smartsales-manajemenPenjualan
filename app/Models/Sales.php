<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    protected $fillable = [
        'customer_id',
        'user_id',
        'sales_date',
        'payment_method',
        'payment_status',
        'total_price'
    ];

    public function customer()
    {
        return $this->belongsTo(Customers::class);
    }

    public function details()
    {
        return $this->hasMany(SalesDetails::class, 'sales_id');
    }
}
