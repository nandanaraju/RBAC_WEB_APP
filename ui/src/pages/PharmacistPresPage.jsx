import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PharmacistPresPage = () => {
    const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        const fetchCheckouts = async () => {
            try {
                const response = await fetch('api/pharmacist/checkouts');
                const data = await response.json();
                setCheckouts(data);
            } catch (error) {
                console.error('Error fetching checkouts:', error);
            }
        };

        fetchCheckouts();
    }, []);

    const handleConfirmOrder = async (id) => {
        try {
            const response = await fetch(`api/pharmacist/checkouts/${id}/confirm`, {
                method: 'PUT',
            });

            if (response.ok) {
                setCheckouts(checkouts.map((checkout) =>
                    checkout._id === id ? { ...checkout, confirmedByPharmacist: true, status: 'Confirmed' } : checkout
                ));
            } else {
                console.error('Error confirming order');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    const handleRejectOrder = async (id) => {
        try {
            const response = await fetch(`api/pharmacist/checkouts/${id}/reject`, {
                method: 'PUT',
            });

            if (response.ok) {
                setCheckouts(checkouts.map((checkout) =>
                    checkout._id === id ? { ...checkout, confirmedByPharmacist: false, status: 'Cancelled' } : checkout
                ));
            } else {
                console.error('Error rejecting order');
            }
        } catch (error) {
            console.error('Error rejecting order');
        }
    };

    return (
        <>
            <div className="container mx-auto mt-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Pharmacist Prescription Orders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {checkouts.map((checkout) => (
                        <div
                            key={checkout._id}
                            className="bg-white border border-gray-300 rounded-lg shadow-md p-6"
                        >
                            <div className="flex justify-center mb-4">
                                <img
                                    src={checkout.imageUrl}
                                    alt={checkout.prescription.originalname}
                                    className="w-full h-auto max-w-xs rounded-md shadow-sm"
                                />
                            </div>
                            <div className="text-gray-700">
                                <p className="mb-2">
                                    <strong>Name:</strong> {checkout.name}
                                </p>
                                <p className="mb-2">
                                    <strong>Address:</strong> {checkout.address}
                                </p>
                                <p className="mb-2">
                                    <strong>Contact:</strong> {checkout.contactNumber}
                                </p>
                                <p className="mb-2">
                                    <strong>Prescription:</strong> {checkout.prescription.originalname}
                                </p>
                                {checkout.status === 'Confirmed' ? (
                                    <p className="text-green-600 font-semibold">
                                        <strong>Status:</strong> Confirmed
                                    </p>
                                ) : checkout.status === 'Cancelled' ? (
                                    <p className="text-red-600 font-semibold">
                                        <strong>Status:</strong> Cancelled
                                    </p>
                                ) : (
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={() => handleConfirmOrder(checkout._id)}
                                            className="flex-grow bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => handleRejectOrder(checkout._id)}
                                            className="flex-grow bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Link
                        to="/pharmacist"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition"
                    >
                        Go Back
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PharmacistPresPage;
