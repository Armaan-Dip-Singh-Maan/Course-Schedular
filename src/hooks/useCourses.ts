import { useState } from 'react';
import { Course } from '../types';

let courseIdCounter = 1;

const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addCourse = async (newCourse: Course) => {
    try {
      const courseWithId = {
        ...newCourse,
        id: courseIdCounter++
      };
      setCourses(prevCourses => [...prevCourses, courseWithId]);
      setError(null);
    } catch (err) {
      setError('Failed to add course. Please try again.');
      throw err;
    }
  };

  const deleteCourse = async (id: number) => {
    try {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete course. Please try again.');
      throw err;
    }
  };

  return {
    courses,
    error,
    addCourse,
    deleteCourse
  };
};

export default useCourses;