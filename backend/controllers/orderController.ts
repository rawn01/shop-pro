import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";

// @desc: Create new order
// @route: POST /api/order
// @access: Private
export const createOrder = asyncHandler(async (req, res) => {
  const { 
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items in the cart");
  }

  // const order = await Order.create({
  //   orderItems: orderItems.map((item) => ({ ...item, product: item._id })),
  //   shippingAddress,
  //   paymentMethod,
  //   itemsPrice,
  //   taxPrice,
  //   shippingPrice,
  //   totalPrice
  // });

  const order = new Order({
    orderItems: orderItems.map((item) => ({ ...item, product: item._id })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });


  const createdOrder = await order.save();

  res.staus(201).json(createdOrder);
});

// @desc: Get logged in user's order
// @route: GET /api/order/myorders
// @access: Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const userOrders = await Order.find({ user: req.user._id });

  res.json({ orders: userOrders });
});

// @desc: Get order by id
// @route: GET /api/order/:id
// @access: Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if(!order) {
    res.staus(404);
    throw new Error("No order found");
  }

  res.json(order);
});

// @desc: Update order to paid
// @route: GET /api/order/:id/pay
// @access: Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// @desc: Update to delivere
// @route: GET /api/order/:id/deliver
// @access: Private
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @desc: Get all orders
// @route: GET /api/order
// @access: Private(Admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders");
});
