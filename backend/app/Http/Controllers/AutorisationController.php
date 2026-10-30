<?php

namespace App\Http\Controllers;
use App\Models\Autorisation;
use Illuminate\Http\Request;

class AutorisationController extends Controller
{
    public function index()
    {
        return Autorisation::all();
    }

    public function show($id)
    {
        return Autorisation::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'chantier' => 'required',
            'label' => 'required',
        ]);

        return Autorisation::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $autorisation = Autorisation::findOrFail($id);

        $request->validate([
            'chantier' => 'required',
            'label' => 'required',
        ]);

        $autorisation->update($request->all());

        return $autorisation;
    }

    public function destroy($id)
    {
        $autorisation = Autorisation::findOrFail($id);
        $autorisation->delete();

        return response()->json(null, 204);
    }
}
