const Order = require("../Models/Order");
const User = require("../Models/User");

const EntityNotFoundError = require("../Exceptions/EntityNotFoundError");
const { default: axios } = require("axios");

const GetOrders = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId)

        res.status(200).json(user.orders);
    }
    catch
    {
        console.log(err)
        res.status(500).json(res.message);
    }
}

const GetOrder = async (req, res) =>
{
    try
    {
        const orderID = req.params.id;
        const user = await User.findById(req.userId)

        if(user.orders.filter((o) => o._id.toString() === orderID).length < 1)
        {
            throw new EntityNotFoundError("Order not found")
        }

        const target = await Order.findById(orderID)

        res.status(200).json(target);
    }
    catch
    {
        console.log(err)
        res.status(500).json(res.message);
    }
}

const GetDeck = async (req,res) =>
{
    try
    {
        const user = await User.findById(req.userId)

        res.status(200).json(user.deck);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
}

const PlaceOrder = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId)
        const {customer_delivery, cart} = req.body;

        const data = {
            business: {
                name: "Business",
                addressLine1: "BizzLine1",
                addressLine2: "BizzLine2",
                city: "BizzCity",
                state: "BizzST",
                zip: "BizzZip",
                email: "name@bizz.com",
                phone: "1234567890"
            },
            client: {
                name: customer_delivery.name,
                phone: customer_delivery.phone,
                email : customer_delivery.email,
                addressLine1: customer_delivery.addressLine1,
                addressLine2: customer_delivery.addressLine2,
                city: customer_delivery.city,
                state: customer_delivery.state,
                zip: customer_delivery.zip
            },
            customs: [],
            "subtotal": "0.00",
            "taxes": "0.00",
            "grand_total": "0.00"
        }

        for(let i = 0; i < cart.length; i++)
        {
            data.customs.push({
                name: cart[i],
                price: "0.00",
                description: "",
                quantity: "1"
            })
        }

        let invoice = "";

        await axios.post(process.env.INVOICE_URL, data)
            .then((res) => invoice = res.data);
        
        const newOrder = new Order({customer_delivery, cart, invoice, status: "Placed", user: user._id});

        await newOrder.save();

        for(let i = 0; i < cart.length; i++)
        {
            const pokemon = cart[i];

            user.deck.push(pokemon);
        }
        
        user.orders.push(newOrder);
        await user.save()

        res.status(200).json(newOrder);
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err.message);
    }
}

module.exports = {
    GetOrders,
    GetOrder,
    PlaceOrder,
    GetDeck
}