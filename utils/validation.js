
export function validateStudentData(studentData) {
  const errors = [];

  // Check that the request body is an object
  if (
    !studentData ||
    typeof studentData !== 'object' ||
    Array.isArray(studentData)
  ) {
    throw Object.assign(
      new Error('Request body must be a valid object.'),
      { statusCode: 400 }
    );
  }

  const { firstName, lastName, email, subjects } = studentData;

  // Validate first name
  if (
    typeof firstName !== 'string' ||
    firstName.trim() === ''
  ) {
    errors.push('First name is required and must be a string.');
  }

  // Validate last name
  if (
    typeof lastName !== 'string' ||
    lastName.trim() === ''
  ) {
    errors.push('Last name is required and must be a string.');
  }

  // Validate email
  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.push('A valid email address is required.');
  }

  // Validate subjects
  if (
    !subjects ||
    typeof subjects !== 'object' ||
    Array.isArray(subjects) ||
    Object.keys(subjects).length === 0
  ) {
    errors.push('At least one subject is required.');
  } else {
    for (const [subject, score] of Object.entries(subjects)) {
      if (subject.trim() === '') {
        errors.push('Subject names cannot be empty.');
      }

      if (
        typeof score !== 'number' ||
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100
      ) {
        errors.push(
          `${subject} must have a numeric score between 0 and 100.`
        );
      }
    }
  }

  if (errors.length > 0) {
    throw Object.assign(
      new Error('Student validation failed.'),
      {
        statusCode: 400,
        errors
      }
    );
  }

  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    subjects
  };
}
