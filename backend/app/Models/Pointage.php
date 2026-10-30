<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pointage extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "pointage";
    protected $primaryKey="pointage";
    protected $fillable = ['date', 'userIdUser', 'presense'];
    public function user()
    {
        return $this->belongsTo(User::class, 'userIdUser', 'id_user');
    }    
}
