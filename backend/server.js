import path from 'path';
import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from "./routes/uploadRoutes.js";
import ZarinpalCheckout from 'zarinpal-checkout'
import fileUpload from 'express-fileupload'

const app = express()

//fro access to form body data
app.use(express.json())

dotenv.config()

app.use(fileUpload())

connectDB()


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

app.get('/PaymentRequest', function(req, res) {
    zarinpal.PaymentRequest({
        Amount: '1000',
        CallbackURL: 'http://siamak.us',
        Description: 'Hello NodeJS API.',
        Email: 'hi@siamak.work',
        Mobile: '09120000000'
    }).then(function (response) {
        if (response.status == 100) {
            res.redirect(response.url);
        }
    }).catch(function (err) {
        console.log(err);
    });
});
const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname), 'frontend', 'build', 'index.html')
    })
} else {
    app.get('/', (req, res) => {
        res.send('api is running')
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(5000, console.log(`Server running on port ${process.env.PORT}`))