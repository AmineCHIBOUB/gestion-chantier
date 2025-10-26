<?php

namespace App\Http\Controllers;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'message' => 'required|string',
            'chantier' => 'required|string'
        ]);

        $notification = Notification::create($data);

        return response()->json(['error' => false, 'message' => 'Notification ajoutée']);
    }

    public function getAll()
    {
        $notifications = Notification::all();
        return response()->json($notifications);
    }
}
