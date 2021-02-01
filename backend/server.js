import  express from 'express'
import  connectDB from './config/db.js'
import  dotenv  from 'dotenv'
import {notFound , errorHandler} from "./middleware/errorMiddleware.js";
import  productRoutes from './routes/productRoutes.js'
import userRoutes from  './routes/userRoutes.js'
import orderRoutes from  './routes/orderRoutes.js'

const app = express()

//fro access to form body data
app.use(express.json())

dotenv.config()

connectDB()




app.get('/',(req,res)=>{
    res.send('api is running')
 })

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(5000, console.log(`Server running on port ${process.env.PORT}`))