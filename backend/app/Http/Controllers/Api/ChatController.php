<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function message(Request $request)
    {
        $request->validate(['message' => 'required|string']); // on recoit le message react

        $response = Http::post('http://127.0.0.1:8000/chat', [ // l api revient egalement avec le response de langchain c est synchrone
            'message' => $request->message, // laravel envoit le message au back python pour l agent IA
        ]);

        // Debug
        if ($response->failed()) {
            return response()->json([
                'error' => 'Microservice Python indisponible',
                'status' => $response->status(),
                'body' => $response->body()
            ], 500);
        }

        return response()->json($response->json()); // on envoit la reponse au front react
    }
}