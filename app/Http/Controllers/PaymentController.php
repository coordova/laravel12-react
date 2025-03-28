<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Payments', [
            // 'payments' => Payment::latest()->paginate(4)
            'payments' => Payment::orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate the request data
        $request->validate([
            'amount' => 'required|numeric|gt:0',
            'status' => 'required|in:pending,processing,success,failed',
            'email' => 'required|email|unique:payments,email',
        ]);

        // create the payment
        Payment::create($request->all());
        // return redirect()->route('payments.index')->with('success', 'Payment created successfully...');
        return response()->json(['message' => 'Payment created successfully...'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'status' => 'required|in:pending,processing,success,failed',
            'email' => 'required|email',
        ]);

        $payment->update($request->all());
        // return redirect()->route('payments.index')->with('success', 'Payment updated successfully...');
        return response()->json(['message' => 'Payment updated successfully...'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        // return redirect()->route('payments.index')->with('success', 'Payment deleted successfully...');
    }
}
