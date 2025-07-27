const express = require('express');
const uploadRoute = require('./routes/upload');
const externalRoute = require('./routes/external');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const authRouter = require('./routes/auth');
const path = require('path');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/users');
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', uploadRoute);
app.use('/external-users', externalRoute);
app.use(errorHandler);
app.use('/auth', authRouter);
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.get('/', (req, res) => {
  res.redirect('/users');
});
const PORT = 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
