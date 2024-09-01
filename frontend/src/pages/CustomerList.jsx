import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(
                    "https://crm-system-backend.vercel.app"
                );
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://crm-system-backend.vercel.app/${id}`);
            console.log(res);
            setCustomers(customers.filter((customer) => customer._id !== id));
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/customers/edit/${id}`);
    };

    const handleNewCustomer = () => {
        navigate("/customers/new");
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Customer List</h2>
                <button
                    onClick={handleNewCustomer}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    New Customer
                </button>
            </div>
            {customers.length === 0 ? (
                <p className="text-center text-gray-600">No customers in the database, please add one.</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer._id}>
                                <td className="py-2 px-4 border-b">{customer.name}</td>
                                <td className="py-2 px-4 border-b">{customer.email}</td>
                                <td className="py-2 px-4 border-b">{customer.address}</td>
                                <td className="py-2 px-4 border-b">{customer.phone}</td>
                                <td className="py-2 px-4 border-b flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(customer._id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CustomerList;
