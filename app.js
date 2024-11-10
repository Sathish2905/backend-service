const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const productImageRoutes = require('./routes/productImageRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const addressRoutes = require('./routes/addressRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const unitTypeRoutes = require('./routes/unitTypeRoutes');
const unitRoutes = require('./routes/unitRoutes');
const productUnitRoutes = require('./routes/productUnitRoutes');
const sizeRoutes = require('./routes/sizeRoutes');
const productVariantRoutes = require('./routes/productVariantRoutes');
const sitePropertyRoutes = require('./routes/sitePropertyRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', productImageRoutes);
app.use('/api', inventoryRoutes);                
app.use('/api', cartRoutes);            
app.use('/api', orderRoutes); 
app.use('/api', paymentRoutes); 
app.use('/api', addressRoutes); 
app.use('/api', shippingRoutes);
app.use('/api', reviewRoutes);
app.use('/api', unitTypeRoutes);
app.use('/api', unitRoutes);
app.use('/api', productUnitRoutes);
app.use('/api', sizeRoutes);
app.use('/api', productVariantRoutes);
app.use('/api', sitePropertyRoutes);
app.use('/api', auditLogRoutes);

const allowedOrigins = [
  'https://mystore-git-dev-sathish-kumar-t.vercel.app', // Vercel origin
  'http://localhost:3000',
  'http://localhost:5173'// Local origin,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log('Server is running on port '+ PORT));
}).catch(err => console.error('Database connection error:', err));
