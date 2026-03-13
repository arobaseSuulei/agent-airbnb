<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Logement;
use Illuminate\Http\Request;

class LogementController extends Controller
{
    // GET /api/logements
    public function index(Request $request)
    {
        $query = Logement::where('disponible', true);

        if ($request->ville) {
            $query->where('ville', 'ilike', '%' . $request->ville . '%');
        }

        if ($request->nb_personnes) {
            $query->where('capacite', '>=', $request->nb_personnes);
        }

        if ($request->prix_max) {
            $query->where('prix_par_nuit', '<=', $request->prix_max);
        }

        return response()->json($query->get());
    }

    // GET /api/logements/{id}
    public function show($id)
    {
        $logement = Logement::findOrFail($id);
        return response()->json($logement);
    }
}