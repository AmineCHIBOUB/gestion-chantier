<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "notification";
    protected $primaryKey="id_notification";
    protected $fillable = ['date', 'message', 'chantier'];
}
