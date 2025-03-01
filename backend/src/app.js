import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import errorHandling from './middlewares/errorHandler.js'
import authMiddleware from './middlewares/authMiddleware.js'
import * as inputValidator from './middlewares/inputValidator.js'


const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/api/students', authMiddleware, inputValidator.studentValidation, studentRoutes)


// error handling middleware
app.use(errorHandling)


export default app;

