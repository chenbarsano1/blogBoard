import express from 'express'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
// import authMiddleware from './middleware/authMiddleware.js'

// set the server port
const port = process.env.PORT || 5000

// connect to MongoDB database
connectDB()

// initialize an Express application
const app = express()

// allow the Express application to accept JSON data in the body of the request
app.use(express.json())
// allow the Express application to accept form data in the body of the request
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes)

// basic route to check if the server is running
app.get('/', (req, res) => res.send('Server is ready'))

app.use(notFound) // catch 404 errors (route is not found)
app.use(errorHandler) // handle all errors

app.listen(port, () => console.log(`Server started on port ${port}`))
