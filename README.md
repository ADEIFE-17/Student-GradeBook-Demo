# Student Gradebook API

A RESTful backend API for managing student records and their subject scores. The API supports creating, retrieving, updating, and deleting student records, with automatic grade calculations and JSON file persistence.

## Features

- Create new student records.
- Retrieve all students.
- Retrieve a student by ID.
- Update existing student records.
- Delete student records.
- Automatically calculate average scores.
- Identify the highest and lowest scores.
- Determine Pass/Fail results for individual subjects.
- Validate student information and subject scores.
- Persist student records using a JSON file.

## Technologies Used

- Node.js
- Express.js
- JavaScript (ES Modules)
- `fs/promises` for file operations
- JSON for data persistence

## Project Structure

```text
student-gradebook-demo/
│
├── data/
│   └── students.json
│
├── routes/
│   └── studentRoutes.js
│
├── services/
│   ├── fileService.js
│   └── studentService.js
│
├── utils/
│   └── validation.js
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/ADEIFE-17/Student-GradeBook-Demo.git
```

### 2. Navigate into the project directory

```bash
cd student-gradebook-demo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

The server runs at:

```text
http://localhost:3000
```

## API Endpoints

Base URL: `http://localhost:3000/api/students`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Retrieve all students |
| GET | `/api/students/:id` | Retrieve a student by ID |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Creating a Student

**Endpoint:** `POST /api/students`

Example request body:

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "subjects": {
    "Mathematics": 85,
    "English": 45,
    "Computer Science": 50
  }
}
```

The API automatically generates the student's ID and calculates their grade statistics.

## Grade Calculations

The API automatically calculates:

- **Average:** The average of all subject scores.
- **Highest Score:** The highest score recorded across all subjects.
- **Lowest Score:** The lowest score recorded across all subjects.
- **Subject Results:** Each subject receives a Pass or Fail result.

The pass mark is **50**.

A score of 50 or above is classified as Pass. A score below 50 is classified as Fail.

## Example Response

```json
{
  "success": true,
  "message": "Student created successfully.",
  "data": {
    "id": "STU-generated-id",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "subjects": {
      "Mathematics": 85,
      "English": 45,
      "Computer Science": 50
    },
    "average": 60,
    "highestScore": 85,
    "lowestScore": 45,
    "subjectResults": {
      "Mathematics": "Pass",
      "English": "Fail",
      "Computer Science": "Pass"
    },
    "createdAt": "ISO timestamp",
    "updatedAt": "ISO timestamp"
  }
}
```

## Validation Rules

The API validates student information before saving records.

- First name is required.
- Last name is required.
- A valid email address is required.
- At least one subject must be provided.
- Subject names cannot be empty.
- Subject scores must be numbers.
- Subject scores must be between 0 and 100.

Invalid requests return a `400 Bad Request` response.

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | OK — Request successful |
| 201 | Created — Student successfully created |
| 400 | Bad Request — Invalid input |
| 404 | Not Found — Student or route not found |
| 500 | Internal Server Error |

## Data Storage

Student records are stored in:

```text
data/students.json
```

The project uses Node.js file system operations through `fs/promises` to read and write student records. No database is required.

## Testing

API endpoints can be tested using Postman or another API testing tool.

Tests include:
- Creating student records.
- Retrieving student records.
- Updating student information.
- Deleting student records.
- Validating incorrect input.
- Checking automatic grade calculations.
- Testing non-existent student IDs.

## Author

ADENIYI OLAMIDE ADEIFE

**Student Gradebook API — Backend Demo Project**

GitHub: https://github.com/ADEIFE-17/Student-GradeBook-Demo
