const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
  const orderList = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.post(`/`, async (req, res) => {
  try {
    const orderItemsIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );
    const orderIdsResolved = await orderItemsIds;
    const totalPrices = await Promise.all(
      orderIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    var order = new Order({
      orderItems: orderIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalprice: totalPrice,
      user: req.body.user,
      dateOrdered: req.body.dateOrdered,
    });
    order = await order.save();
    if (!order) {
      res.status(400).send("Order not placed!");
    } else {
      res.status(200).send({ message: "Your Order is placed!", order: order });
    }
  } catch (err) {
    console.log(err, "error");
  }
});

router.put(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
  if (!order) {
    return res.status(400).send("The status can not be updated!");
  }
  return res.status(200).send(order);
});

// Remove order and related order items
router.delete(`/:id`, async (req, res) => {
  Order.findByIdAndRemove(req.params.id, { new: true })
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res.status(200).send({ message: "The order is deleted successfully!" });
      }
      return res.status(400).send("The order can not be deleted!");
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

// Total sales
router.get(`/get/totalsales`, async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalprice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }
  res.send({ totalsales: totalSales.pop().totalsales });
});

router.get(`/get/userorders/:userid`, async (req, res) => {
  const userOrderList = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });

  if (!userOrderList) {
    return res.status(400).send("user order list not found");
  }
  res.send(userOrderList);
});
router.get(`/get/count`, async (req, res) => {
  const ordersCount = await Order.countDocuments();
  if (!ordersCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    ordersCount: ordersCount,
  });
});
module.exports = router;
