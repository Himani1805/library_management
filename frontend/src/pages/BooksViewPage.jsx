import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../utils/apiClient";

const BooksViewPage = () => {
    const { id } = useParams();
    const [pdfUrl, setPdfUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const res = await apiClient.get(`/books/${id}/content`, {
                    responseType: "blob",
                    withCredentials: true,
                });

                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                const url = URL.createObjectURL(pdfBlob);
                setPdfUrl(url);
            } catch (err) {
                console.error("Error fetching book PDF:", err);
                setError("You don't have access to this book or it doesn't exist.");
            } finally {
                setLoading(false);
            }
        };
        fetchPDF();
    }, [id]);

    if (loading)
        return <p className="text-center text-gray-600 mt-10">Loading PDF...</p>;
    if (error)
        return <p className="text-center text-red-600 mt-10">{error}</p>;

    return (
        <div className="flex justify-center items-center mt-6">
            {/* <div className="absolute top-4 right-4 text-gray-500 text-sm opacity-50 select-none">
                {"userEmail"} - Confidential
            </div> */}

            <iframe
                src={`${pdfUrl}#toolbar1=0&navpanes=0&scrollbar=1&view=FitH`}
                title="Book PDF"
                className="w-[90vw] h-[90vh] border rounded shadow"
    
            // sandbox="allow-same-origin allow-scripts"
            ></iframe>
        </div>
    );
};

export default BooksViewPage;
