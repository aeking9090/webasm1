const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const products = [
  {
    id: 1,
    name: 'Aero Jacket',
    price: 1290000,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    tag: 'Best Seller',
    description: 'Modern, lightweight comfort with elevated craftsmanship.'
  },
  {
    id: 2,
    name: 'Lumen Tote',
    price: 840000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    tag: 'Trending',
    description: 'A polished everyday carrier with premium finishes.'
  },
  {
    id: 3,
    name: 'Contour Sneakers',
    price: 1120000,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80',
    tag: 'Limited',
    description: 'Comfort-driven design with an architectural silhouette.'
  },
  {
    id: 4,
    name: 'Harbor Watch',
    price: 1590000,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
    tag: 'New Arrivals',
    description: 'Minimal style with a refined finish for everyday wear.'
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/checkout', (req, res) => {
  const { items = [], customer = {} } = req.body;

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  res.json({
    success: true,
    message: 'Order received successfully.',
    customer,
    subtotal,
    tax,
    total,
    items
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NovaCart server running on http://localhost:${PORT}`);
});
