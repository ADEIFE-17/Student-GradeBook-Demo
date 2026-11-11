
import express from 'express';

import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../services/studentService.js';

const router = express.Router();

// GET /api/students
// Get all students
router.get('/', async (req, res) => {
  const students = await getAllStudents();

  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// GET /api/students/:id
// Get one student by ID
router.get('/:id', async (req, res) => {
  const student = await getStudentById(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found.'
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// POST /api/students
// Create a new student
router.post('/', async (req, res) => {
  const newStudent = await createStudent(req.body);

  res.status(201).json({
    success: true,
    message: 'Student created successfully.',
    data: newStudent
  });
});

// PUT /api/students/:id
// Update a student
router.put('/:id', async (req, res) => {
  const updatedStudent = await updateStudent(
    req.params.id,
    req.body
  );

  if (!updatedStudent) {
    return res.status(404).json({
      success: false,
      message: 'Student not found.'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Student updated successfully.',
    data: updatedStudent
  });
});

// DELETE /api/students/:id
// Delete a student
router.delete('/:id', async (req, res) => {
  const deleted = await deleteStudent(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Student not found.'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully.'
  });
});

export default router;
