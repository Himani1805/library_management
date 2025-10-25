import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

const PaymentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleConfirmPayment = async () => {
        await apiClient.post(`/books/payment/${id}`);
        alert("Payment confirmed!");
        navigate("/my-books");
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 bg-red border rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">Book Purchase</h2>
                <div className="flex gap-8 my-2 mx-2 items-center  ">
                    <label htmlFor="cardNumber" className="text-md">Card Number</label>
                    <input type="text" id="cardNumber" placeholder="Enter your card number"
                        className="border py-2 px-3 rounded w-5/6"
                    />
                </div>

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name"
                        className="border p-2 rounded" />
                </div>
                <div>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" placeholder="MM/YY"
                        className="border p-2 rounded" />
                </div>
                <div>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="CVV"
                        className="border p-2 rounded" />
                </div>
                <button
                    onClick={handleConfirmPayment}
                    className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
