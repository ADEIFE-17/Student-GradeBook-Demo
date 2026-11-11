import { randomUUID } from "node:crypto";

import { readStudents, writeStudents } from "./fileService.js";

import { validateStudentData } from "../utils/validation.js";

// Calculate a student's average score

function calculateGradeStats(subjects) {
  const scores = Object.values(subjects);

  const total = scores.reduce((sum, score) => sum + score, 0);

  const subjectResults = {};

  for (const [subject, score] of Object.entries(subjects)) {
    subjectResults[subject] = score >= 50 ? "Pass" : "Fail";
  }

  return {
    average: Number((total / scores.length).toFixed(2)),
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    subjectResults,
  };
}

// Get all students
export async function getAllStudents() {
  return await readStudents();
}

// Get a student by ID
export async function getStudentById(id) {
  const students = await readStudents();

  return students.find((student) => student.id === id) || null;
}

// Create a new student
export async function createStudent(studentData) {
  const validatedData = validateStudentData(studentData);
  const students = await readStudents();

  const now = new Date().toISOString();

  const newStudent = {
    id: `STU-${randomUUID()}`,
    firstName: validatedData.firstName,
    lastName: validatedData.lastName,
    email: validatedData.email,
    subjects: validatedData.subjects,
    ...calculateGradeStats(validatedData.subjects),
    createdAt: now,
    updatedAt: now,
  };

  students.push(newStudent);

  await writeStudents(students);

  return newStudent;
}

// Update an existing student
export async function updateStudent(id, updatedData) {
  const students = await readStudents();

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return null;
  }

  const validatedData = validateStudentData(updatedData);

  const existingStudent = students[studentIndex];

  const updatedStudent = {
    ...existingStudent,
    firstName: validatedData.firstName,
    lastName: validatedData.lastName,
    email: validatedData.email,
    subjects: validatedData.subjects,
    ...calculateGradeStats(validatedData.subjects),
    updatedAt: new Date().toISOString(),
  };

  students[studentIndex] = updatedStudent;

  await writeStudents(students);

  return updatedStudent;
}

// Delete a student
export async function deleteStudent(id) {
  const students = await readStudents();

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return false;
  }

  students.splice(studentIndex, 1);

  await writeStudents(students);

  return true;
}
