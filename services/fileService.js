import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the current directory
const currentDir = path.dirname(fileURLToPath(import.meta.url));

// Locate the data directory
const dataDir = path.resolve(currentDir, "../data");

// Locate the students JSON file
const studentsFile = path.join(dataDir, "students.json");

// Read all students
export async function readStudents() {
  try {
    // Ensure the data directory exists
    await mkdir(dataDir, { recursive: true });

    // Read the JSON file
    const data = await readFile(studentsFile, "utf-8");

    // Convert JSON text into JavaScript data
    const students = JSON.parse(data);

    if (!Array.isArray(students)) {
      throw new Error("Student data must be an array.");
    }

    return students;
  } catch (error) {
    // Create an empty JSON file if it does not exist
    if (error.code === "ENOENT") {
      await writeFile(studentsFile, "[]", "utf-8");
      return [];
    }

    throw error;
  }
}

// Save all students
export async function writeStudents(students) {
  if (!Array.isArray(students)) {
    throw new TypeError("Students must be an array.");
  }

  await mkdir(dataDir, { recursive: true });

  const data = JSON.stringify(students, null, 2);

  await writeFile(studentsFile, data, "utf-8");
}
