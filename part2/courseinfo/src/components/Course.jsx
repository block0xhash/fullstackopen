import React from 'react';

// Part Component
const Part = ({ part }) => {
  return (
    <li>{part.name} {part.exercises}</li>
  );
};

// Course Component
const Course = ({ course }) => {
  return (
    <div>
      <h3>{course.name}</h3>
      <ul>
        {course.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </ul>
      <h3>
        Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </h3>
    </div>
  );
};

export default Course;
