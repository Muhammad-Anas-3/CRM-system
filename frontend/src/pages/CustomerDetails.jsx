import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        // Add other fields as necessary
    });

    useEffect(() => {
        // Fetch customer details from API
        fetch(`/api/customers/${id}`)
            .then(response => response.json())
            .then(data => setCustomer(data))
            .catch(error => console.error('Error fetching customer:', error));
    }, [id]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update customer details via API
        fetch(`/api/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
            .then(response => response.json())
            .then(() => navigate('/customers'))
            .catch(error => console.error('Error updating customer:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded"
                    />
                </div>
                {/* Add other fields here */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update Customer
                </button>
            </form>
        </div>
    );
};

export default CustomerDetails;
