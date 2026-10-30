<?php

// Plan.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    public $timestamps = false;
    protected $table = "plan";
    protected $primaryKey="id_plan";
    protected $fillable = ['chantierIdChantier', 'label'];
}
