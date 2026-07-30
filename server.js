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
    name: 'Lumen Briefcase',
    price: 840000,
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" rx="40" fill="%23f2efe8"/%3E%3Crect x="220" y="220" width="360" height="220" rx="32" fill="%233b2a1f"/%3E%3Crect x="250" y="190" width="300" height="80" rx="24" fill="%236f4b34"/%3E%3Crect x="300" y="270" width="220" height="120" rx="20" fill="%23c7a477"/%3E%3Crect x="330" y="240" width="60" height="40" rx="12" fill="%23f4ddbf"/%3E%3Crect x="402" y="240" width="60" height="40" rx="12" fill="%23f4ddbf"/%3E%3Cpath d="M330 220v-40h140v40" stroke="%23d8b07a" stroke-width="16" fill="none" stroke-linecap="round"/%3E%3C/svg%3E',
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
  },
  {
    id: 5,
    name: 'Apex Trainers',
    price: 1090000,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    tag: 'Performance',
    description: 'Lightweight trainers built for energy, comfort, and everyday motion.'
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
