<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use App\Models\EventRegistration;
class EventController extends Controller
{
    public function index() {
        return Event::with('user')->paginate(10);
    }

  public function store(Request $request) {
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'category' => 'nullable|string|max:255',
        'location' => 'nullable|string|max:255',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'available_seats' => 'required|integer|min:1',
        'image' => 'nullable|image|max:2048', // ✅ validation de l'image
    ]);

    $data = $request->all();

    // 🔹 Gérer l’upload de l’image
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('events', 'public');
    }

    $event = Event::create(array_merge($data, ['user_id' => Auth::id()]));

    return response()->json($event, 201);
}



    public function show(Event $event) {
        return $event->load('user','users');
    }

    public function update(Request $request, Event $event) {
        if($event->user_id != Auth::id()) return response()->json(['error'=>'Unauthorized'],403);

        $event->update($request->all());
        return response()->json($event);
    }

    public function destroy(Event $event) {
        if($event->user_id != Auth::id()) return response()->json(['error'=>'Unauthorized'],403);

        $event->delete();
        return response()->json(['message'=>'Event deleted']);
    }

    public function register(Request $request, Event $event)
    {
        $user = Auth::user();

        // Vérifie si déjà inscrit
        if (EventRegistration::where('event_id', $event->id)->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Déjà inscrit à cet événement.'], 400);
        }

        // Validation des champs
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'location' => 'nullable|string|max:255',
        ]);

        // Créer l'inscription
        $registration = EventRegistration::create([
            'event_id' => $event->id,
            'user_id' => $user->id,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'location' => $validated['location'] ?? $event->location,
            'category' => $event->category ?? null,
            'image' => $event->image ?? null,
        ]);

        return response()->json([
            'message' => 'Inscription réussie',
            'registration' => $registration
        ], 201);
    }

}
