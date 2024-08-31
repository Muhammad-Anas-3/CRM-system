import Customer from "../models/customer_model.js";

// Get all customers
export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

// Get all customers
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

// Add a new customer
export const addCustomer = async (req, res, next) => {
  const { name, email, phone, address } = req.body;
  try {
    let customer = new Customer({
      name,
      email,
      phone,
      address,
    });

    customer = await customer.save();
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

// Update customer details
export const updateCustomer = async (req, res, next) => {
  const { name, email, phone, address } = req.body;

  try {
    let updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedCustomer);
  } catch (err) {
    next(err);
  }
};

// Delete a customer
export const deleteCustomer = async (req, res, next) => {
  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    next(err);
  }
};
