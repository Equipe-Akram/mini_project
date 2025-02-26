import express from 'express'
const router = express.Router()
import {getAllStudents, getStudentById, addStudent} from '../controllers/studentController.js'

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.post('/', addStudent)
/* router.put('/:id', studentControllers.editStudentInfo)
router.delete('/:id', studentControllers.deleteStudent)
 */


/* router.post('/student', async (req, res) => {
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
router.delete('/student/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query( 'DELETE FROM student WHERE id = $1 RETURNING *', [id]);
           
        if (result.rows.length > 0) {
            res.json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
        console.log(error);
    }
});

router.put('/student/:id', async (req, res) => {
    const { id } = req.params;  
    const { nom, prenom, note } = req.body;  
    try {
        const result = await pool.query('UPDATE student SET nom = $1, prenom = $2, note = $3 WHERE id = $4 RETURNING *',
            [nom, prenom, note, id]);
        res.json(result.rows[0]);
       
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student' });
        console.log(error);
    }
});


router.get('/student/:id', async (req, res) => {
    const { id } = req.params;  // Get student ID from URL parameter

    try {
        const result = await pool.query('SELECT * FROM student WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve student' });
        console.log(error);
    }
});
 */

export default router;



