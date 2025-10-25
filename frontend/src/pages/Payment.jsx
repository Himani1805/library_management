import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

export default function Payment({ book, amount }) {
    const { id: bookId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const confirmPayment = async () => {
        setLoading(true);
        try {
            // Call backend endpoint to record purchase for current user
            // Backend will add bookId to user's purchasedBooks
            const res = await apiClient.post(`/books/purchase/${bookId}`);
            if (res.status === 200) {
                // success -> redirect to view page
                navigate(`/books/view/${bookId}`);
            } else {
                alert(res.data?.message || "Payment failed");
            }
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-xl font-semibold mb-4">Payment — Dummy Gateway</h2>
            <p className="mb-6">This is a dummy payment page. Click confirm to simulate successful payment.</p>

            <div className="flex gap-3">
                <button onClick={() => navigate(-1)} className="px-4 py-2 rounded border">Cancel</button>
                <button onClick={confirmPayment} className="px-4 py-2 rounded bg-cyan-600 text-white" disabled={loading}>
                    {loading ? "Processing..." : "Confirm Payment"}
                </button>
            </div>
        </div>
    );
}
