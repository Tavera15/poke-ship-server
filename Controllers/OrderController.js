const Order = require("../Models/Order");
const User = require("../Models/User");

const EntityNotFoundError = require("../Exceptions/EntityNotFoundError");

const GetOrders = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId)

        res.status(200).json(target.orders);
    }
    catch
    {
        res.status(500).json(res.message);
    }
}

const PlaceOrder = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId)
        const {customer_delivery, cart} = req.body;
        
        const newOrder = new Order({customer_delivery, cart, status: "Placed", user: user._id});
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
    PlaceOrder,
}