import  express from 'express'
import  connectDB from './config/db.js'
import  dotenv  from 'dotenv'
import  productRoutes from './routes/productRoutes.js'

const app = express()

dotenv.config()

connectDB()

app.use('/api/products',productRoutes)

app.listen(5000 , console.log(`Server running on port ${process.env.PORT}`)) 