const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    customer_delivery: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
    },
    cart: [
        {
            type: String
        }
    ],
    status: {
        type: String,
        enum: ["Placed", "Shipped"],
    },
    tracking: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    invoice: {
        type: String,
        required: true
    }
})

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;