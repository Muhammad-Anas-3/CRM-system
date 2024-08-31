import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch customer details for editing
            axios.get(`https://crm-systemckend.vercel.app/api/customers/${id}`)
                .then(response => {
                    const customer = response.data;
                    setName(customer.name);
                    setEmail(customer.email);
                    setAddress(customer.address);
                    setPhone(customer.phone);
                })
                .catch(error => console.error("Error fetching customer:", error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customerData = { name, email, address, phone };

        try {
            if (id) {
                // Edit existing customer
                await axios.put(`https://crm-systemckend.vercel.app/api/customers/${id}`, customerData);
            } else {
                // Create new customer
                await axios.post("https://crm-systemckend.vercel.app/api/customers", customerData);
            }
            navigate("/customers");
        } catch (error) {
            console.error("Error saving customer:", error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">
                {id ? "Edit Customer" : "New Customer"}
            </h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {id ? "Update Customer" : "Create Customer"}
                </button>
            </form>
        </div>
    );
};

export default CustomerForm;
