<?php

namespace App\Http\Controllers;
use App\Models\Pointage;
use Illuminate\Http\Request;

class PointageController extends Controller
{
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required|date',
            'userIdUser' => 'required|integer',
            'presense' => 'required|boolean',
        ]);

        $pointage = Pointage::create($validatedData);

        return response()->json($pointage, 201);
    }

    public function getAll()
    {
        $pointages = Pointage::with('user')->orderByDesc('date')->get();

        return response()->json($pointages);
    }
}
