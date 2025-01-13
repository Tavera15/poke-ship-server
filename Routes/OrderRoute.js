const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");
const verifyToken = require("../Middleware/Auth");

router.get("/", verifyToken, (req, res) => OrderController.GetOrders(req, res));
router.post("/PlaceOrder", verifyToken, (req, res) => OrderController.PlaceOrder(req, res));

module.exports = router;