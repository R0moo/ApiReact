<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Illuminate\Http\Request;

class NotasController extends Controller
{
    public function index()
    {
        return Nota::all();
    }

    public function store(Request $request)
    {
        $nota = Nota::create($request->only('titulo', 'texto'));
        
        return response()->json([
            'message' => 'Nota criada com sucesso',
            'data' => $nota
        ], 201);
    }

    public function show(string $id)
    {
        $nota = Nota::find($id);
        
        if (!$nota) {
            return response()->json([
                'message' => 'Nota não encontrada'
            ], 404);
        }
        
        return $nota;
    }

    public function update(Request $request, string $id)
    {
        $nota = Nota::find($id);
        
        if (!$nota) {
            return response()->json([
                'message' => 'Nota não encontrada'
            ], 404);
        }
        
        $nota->update($request->only('titulo', 'texto'));
        
        return response()->json([
            'message' => 'Nota atualizada com sucesso',
            'data' => $nota
        ], 200);
    }

    public function destroy(string $id)
    {
        $nota = Nota::find($id);
        
        if (!$nota) {
            return response()->json([
                'message' => 'Nota não encontrada'
            ], 404);
        }
        
        $nota->delete();
        
        return response()->json([
            'message' => 'Nota excluída com sucesso'
        ], 200);
    }
}