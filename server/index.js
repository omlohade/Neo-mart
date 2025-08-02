const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); 
const CustomerModel = require('./models/Customer');
const AdminModel = require('./models/Admin');
const CardModel = require('./models/Card');
const OrderModel = require('./models/order');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('Uploads'));
mongoose.connect("mongodb://127.0.0.1:27017/employee");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });




// Add a new endpoint for adding cards
app.post('/AddCard', upload.single('image'), (req, res) => {
    const { DressName, Prize, crossed, off, discription, categories} = req.body;

    const parsedCategories = JSON.parse(categories);

    const image = req.file ? req.file.path : null;

    const newCard = new CardModel({
        DressName,
        Prize,
        crossed,
        off,
        discription,
        image, 
        categories: parsedCategories 
    });

    newCard.save()
        .then(card => {
            res.json(card);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// Add a new endpoint for placing orders
app.post('/placeOrder', (req, res) => {
    const { customerName, address, items, totalBill } = req.body;

    // Assuming you have an OrderModel defined with appropriate schema
    const newOrder = new OrderModel({
        customerName,
        address,
        items,
        totalBill
    });

    newOrder.save()
        .then(order => {
            res.json({ message: "Order placed successfully!", order });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Add a new endpoint for removing cards
app.delete('/RemoveCard', (req, res) => {
    const { DressName, Prize, crossed, off, discription } = req.body;

    CardModel.findOneAndDelete({ DressName, Prize, crossed, off, discription })
        .then(card => {
            if (!card) {
                return res.status(404).json({ error: "Card not found" });
            }
            res.json({ message: "Card removed successfully" });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// Add a new endpoint for customer login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    CustomerModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Customer Login Success");
                } else {
                    res.json("Customer Password is incorrect");
                }
            } else {
                res.json("No Customer record exists with this email");
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Add a new endpoint for customer registration
app.post('/register', (req, res) => {
    CustomerModel.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return CustomerModel.findOneAndUpdate({ email: req.body.email }, req.body, { new: true })
            } else {
                return CustomerModel.create(req.body);
            }
        })
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Add a new endpoint for admin login
app.post('/AdminLogin', (req, res) => {
    const { email, password } = req.body;
    AdminModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Admin Login Success");
                } else {
                    res.json("Admin Password is incorrect");
                }
            } else {
                res.json("No admin record exists with this email");
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Add a new endpoint for admin registration
app.post('/AdminRegister', (req, res) => {
    AdminModel.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return AdminModel.findOneAndUpdate({ email: req.body.email }, req.body, { new: true })
            } else {
                return AdminModel.create(req.body);
            }
        })
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Add a new endpoint for fetching cards based on category
app.get('/cards', (req, res) => {
    const { categories } = req.query;
    CardModel.find({ categories: categories })
        .then(cards => {
            res.json(cards);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


/// Add a new endpoint for adding items to the order table
app.post('/addToCart', (req, res) => {
    const { email, item } = req.body;
  
    CustomerModel.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        OrderModel.findOneAndUpdate(
          { customerName: user.name },
          { $push: { items: item._id } },
          { new: true, upsert: true }
        )
        .then(order => {
          res.json({ message: "Item added to order table successfully!" });
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  

// Add a new endpoint for fetching order information based on customer name and address
app.get('/orderInfo', (req, res) => {
    const { customerName, address } = req.query;
    OrderModel.findOne({ customerName: customerName, address: address })
        .then(order => {
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.get('/orderItems', (req, res) => {
    const { orderId } = req.query;
    console.log('Received request to fetch order items for orderId:', orderId);

    OrderModel.findById(orderId)
        .populate('items')
        .then(order => {
            if (order) {
                console.log('Found order:', order);
                res.json(order.items);
            } else {
                console.log('Order not found for orderId:', orderId);
                res.status(404).json({ error: "Order not found" });
            }
        })
        .catch(err => {
            console.error('Error fetching order items:', err);
            res.status(500).json({ error: err.message });
        });
});


// Add a new endpoint for fetching orders
app.get('/getOrders', (req, res) => {
    OrderModel.find()
        .populate('items') // Populate the items associated with each order
        .then(orders => {
            res.json(orders);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});





// Add a new endpoint for removing items from the order table
app.delete('/removeFromCart', (req, res) => {
    const { email, itemId } = req.body;

    CustomerModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            OrderModel.findOneAndUpdate(
                { customerName: user.name },
                { $pull: { items: itemId } },
                { new: true }
            )
                .then(order => {
                    if (order) {
                        res.json({ message: "Item removed from order table successfully!" });
                    } else {
                        res.status(404).json({ error: "Order not found" });
                    }
                })
                .catch(err => {
                    res.status(500).json({ error: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.get('/checkCustomer', (req, res) => {
    const { email, password } = req.query;
    CustomerModel.findOne({ email: email, password: password })
        .then(customer => {
            console.log('Customer:', customer);
            if (!customer) {
                return res.status(404).json({ error: "Customer not found" });
            }

            const requiredFields = ['name', 'dob', 'age', 'phoneNumber', 'address'];
            const missingFields = requiredFields.filter(field => !customer[field]);
            console.log('Missing fields:', missingFields);

            if (missingFields.length > 0) {
                res.json({ complete: false, missingFields });
            } else {
                res.json({ complete: true });
            }
        })
        .catch(err => {
            console.error('Error checking customer profile:', err);
            res.status(500).json({ error: err.message });
        });
});



// Add a new endpoint for adding items to the wishlist table
app.post('/addToWishlist', (req, res) => {
    const { email, item } = req.body;

    CustomerModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            OrderModel.findOneAndUpdate(
                { customerName: user.name },
                { $push: { wishlistItems: item._id } },
                { new: true, upsert: true }
            )
                .then(order => {
                    res.json({ message: "Item added to wishlist table successfully!" });
                })
                .catch(err => {
                    res.status(500).json({ error: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


// Add a new endpoint for fetching wishlist items
app.get('/wishlistItems', (req, res) => {
    const { customerName, address } = req.query;
    OrderModel.findOne({ customerName: customerName, address: address })
        .populate('wishlistItems')
        .then(order => {
            if (order) {
                res.json(order.wishlistItems);
            } else {
                res.status(404).json({ error: "Wishlist items not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Add a new endpoint for removing items from the wishlist table
app.delete('/removeFromWishlist', (req, res) => {
    const { email, itemId } = req.body;

    CustomerModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            OrderModel.findOneAndUpdate(
                { customerName: user.name },
                { $pull: { wishlistItems: itemId } },
                { new: true }
            )
                .then(order => {
                    if (order) {
                        res.json({ message: "Item removed from wishlist table successfully!" });
                    } else {
                        res.status(404).json({ error: "Wishlist not found" });
                    }
                })
                .catch(err => {
                    res.status(500).json({ error: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


// Add a new endpoint for marking orders as completed
app.delete('/markOrderCompleted/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Assuming you have an OrderModel defined with appropriate schema
    OrderModel.findByIdAndDelete(orderId)
        .then(order => {
            if (order) {
                res.json({ message: "Order marked as completed successfully!" });
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


app.listen(process.env.PORT || 3001, () => {
    console.log("server is running");
}); 