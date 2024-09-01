import Customer from "../models/customer_model.js";

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ msg: "Failed to retrieve customers" });
  }
};

// Get a single customer by ID
export const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Failed to retrieve customer" });
  }
};

// Add a new customer
export const addCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
      return res.status(400).json({ msg: "Customer already exists" });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
    });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add customer" });
  }
};

// Update customer details
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update customer" });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete customer" });
  }
};
