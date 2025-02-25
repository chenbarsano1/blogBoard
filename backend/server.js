import express from 'express'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
// import authMiddleware from './middleware/authMiddleware.js'
import postRoutes from './routes/postRoutes.js'

// set the server port
const port = process.env.PORT || 5000

// connect to MongoDB database only if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB()
}

// initialize an Express application
const app = express()

// allow the Express application to accept JSON data in the body of the request
app.use(express.json())
// allow the Express application to accept form data in the body of the request
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// basic route to check if the server is running
app.get('/', (req, res) => res.send('Server is ready'))

app.use(notFound) // catch 404 errors (route is not found)
app.use(errorHandler) // handle all errors

export default app

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server started on port ${port}`))
}
