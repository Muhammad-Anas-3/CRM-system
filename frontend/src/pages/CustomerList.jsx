import { useEffect, useState } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customers from API
        fetch('/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer List</h1>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id} className="mb-2">
                        <a href={`/customers/${customer.id}`} className="text-blue-500">
                            {customer.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
