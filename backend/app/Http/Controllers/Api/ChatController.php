<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    // POST /api/chat
    public function message(Request $request)
    {
        $request->validate(['message' => 'required|string']);

        // Appel au microservice Python LangChain
        $response = Http::post('http://127.0.0.1:8000/chat', [
            'message' => $request->message,
        ]);

        return response()->json($response->json());
    }
}