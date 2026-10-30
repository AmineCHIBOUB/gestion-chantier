<?php

namespace App\Http\Controllers;
use App\Models\Habilite;
use Illuminate\Http\Request;

class HabiliteController extends Controller
{
    public function index(Request $request,$userIdUser)
    {

        $habilites = Habilite::where('userIdUser', $userIdUser)->get();
        return $habilites;
    }

    public function show($id)
    {
        $habilite = Habilite::findOrFail($id);
        return response()->download(storage_path('app/public/' . $habilite->label));
    }

    public function downloadFile($filename)
    {
        return Storage::download('HabiliteFiles/' . $filename);
    }

    public function store(Request $request)
    {
        $request->validate([
            'userIdUser' => 'required',
            'label' => 'required|file',
        ]);

        $habilite = new Habilite();
        $habilite->userIdUser = $request->userIdUser;
        $filename = uniqid().'.'.$request->file('label')->extension();
        $habilite->label = $request->file('label')->storeAs('HabiliteFiles', $filename, 'public');
        $habilite->save();

        return $habilite;
    }

    public function update(Request $request, $id)
    {
        $habilite = Habilite::findOrFail($id);
        $originalFileName = $request->file('label')->getClientOriginalName();

        Storage::delete('HabiliteFiles/' . $habilite->label);

        $habilite->update([
            'label' => $originalFileName,
        ]);

        $request->file('label')->storeAs('HabiliteFiles', $originalFileName);

        return $habilite;
    }

    public function destroy($id)
    {
        $habilite = Habilite::findOrFail($id);
        Storage::delete('HabiliteFiles/' . $habilite->label);
        $habilite->delete();
        return response()->json(['message' => 'Habilite deleted successfully']);
    }
}
