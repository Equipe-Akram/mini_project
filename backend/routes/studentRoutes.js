const express = require('express')
const router = express.Router()
const pool = require('../config/db.js')

//const studentsController = require('../controllers/studentsController')
router.post('/student', async (req, res) => {
    const {nom, prenom, note} = req.body
    try {
    const result = await pool.query('INSERT INTO student (nom, prenom, note) VALUES ($1, $2, $3) RETURNING *', [nom, prenom, note])
    res.status(201).json(result.rows[0]);
} catch (error) {
    res.status(500).json({ error: 'Failed to add student'})
    console.log(error)
}
})
router.get('/student', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM student')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
})

/* 
router.get('/student', studentControllers.getAllStudents)
router.get('/student/:id', studentControllers.getStudentById)
router.post('/student', studentControllers.addStudent)
router.put('/student/:id', studentControllers.editStudentInfo)
router.delete('/student/:id', studentControllers.deleteStudent)
 */

module.exports = router


