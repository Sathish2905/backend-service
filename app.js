const express = require('express');
const app = express();
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
app.use('/api/', orderRoutes); 
app.use('/api/', paymentRoutes); 
app.use('/api/', addressRoutes); 
app.use('/api/', shippingRoutes);
app.use('/api/', reviewRoutes);
app.use('/api/unitTypes', unitTypeRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/productUnits', productUnitRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/productVariants', productVariantRoutes);
app.use('/api/siteProperty', sitePropertyRoutes);
app.use('/api/auditLog', auditLogRoutes);



const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log('Server is running on port ${PORT}'));
}).catch(err => console.error('Database connection error:', err));
