import express from 'express'
import cors from 'cors'
import studentRoutes from './routes/studentRoutes.js'
import errorHandling from './middlewares/errorHandler.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/students', studentRoutes)

// error handling middleware
app.use(errorHandling)



export default app;

