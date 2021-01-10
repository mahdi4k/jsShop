import  express from 'express'
import  connectDB from './config/db.js'
import  dotenv  from 'dotenv'
import {notFound , errorHandler} from "./middleware/errorMiddleware.js";
import  productRoutes from './routes/productRoutes.js'

const app = express()

dotenv.config()

connectDB()




app.get('/',(req,res)=>{
    res.send('api is running')

})

app.use('/api/products',productRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(5000, console.log(`Server running on port ${process.env.PORT}`))