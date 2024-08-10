const express =  require ('express');
const  dotEnv = require ('dotenv');
const mongoose = require ('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require ('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');


const app = express()

const PORT = 5000;

// mongodb connection //

dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() =>console.log("MongoDB connected successfully"))
.catch((error) => console.log(error));


app.use(bodyParser.json());  // middlewares  to parse JSON //
app.use('/user' , userRoutes); // api, userRoutes //
app.use ('/firm', firmRoutes);  // api, firmRoutes //
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads')); //middleware for images //


// Start the server //
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use('/home', (req,res) =>{
    res.send("Welcome to Mern project")
  })
