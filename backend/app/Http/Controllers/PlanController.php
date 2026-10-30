<?php

// PlanController.php
namespace App\Http\Controllers;
use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        return Plan::all();
    }

    public function show($id)
    {
        $plan = Plan::findOrFail($id);
        return response()->download(storage_path('/app/public/' . $plan->label));
    }

    public function store(Request $request)
    {
        $request->validate([
            'chantierIdChantier' => 'required',
            'label' => 'required|file',
        ]);

        $plan = new Plan();
        $plan->chantierIdChantier = $request->chantierIdChantier;
        $filename = uniqid().'.'.$request->file('label')->extension();
        $plan->label = $request->file('label')->storeAs('plan', $filename, 'public');
        $plan->save();

        return $plan;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'label' => 'required|file',
        ]);

        $plan = Plan::findOrFail($id);
        \Storage::disk('public')->delete($plan->label);
        $plan->label = $request->file('label')->store('plan', 'public');
        $plan->save();

        return $plan;
    }

    public function destroy($id)
    {
        $plan = Plan::findOrFail($id);
        \Storage::disk('public')->delete($plan->label);
        $plan->delete();
        return response()->noContent();
    }
}
