import  express from 'express'
import  connectDB from './config/db.js'
import  dotenv  from 'dotenv'
import  productRoutes from './routes/productRoutes.js'

const app = express()

dotenv.config()

connectDB()




app.get('/',(req,res)=>{
    res.send('api is running')

})

app.use('/api/products',productRoutes)

app.use((req,res,next) =>{
    const error = new Error('not found')
    res.status(404)
    next(error)
})

app.use((err,req,res,next) =>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
})

app.listen(5000, console.log(`Server running on port ${process.env.PORT}`))