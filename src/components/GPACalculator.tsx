import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { Course } from '../types';

interface GPACalculatorProps {
  courses: Course[];
}

interface CourseGrade {
  courseId: string;
  courseName: string;
  credits: number;
  grade: string;
}

const GPACalculator: React.FC<GPACalculatorProps> = ({ courses }) => {
  const [courseGrades, setCourseGrades] = useState<CourseGrade[]>([]);
  const [cumulativeGPA, setCumulativeGPA] = useState<number>(0);

  const gradePoints: { [key: string]: number } = {
    'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  useEffect(() => {
    // Create unique course entries based on course ID
    const uniqueCourses = courses.reduce((acc, course) => {
      if (!acc.some(c => c.courseId === course.id)) {
        acc.push({
          courseId: course.id,
          courseName: course.name,
          credits: course.credits,
          grade: ''
        });
      }
      return acc;
    }, [] as CourseGrade[]);

    setCourseGrades(uniqueCourses);
  }, [courses]);

  useEffect(() => {
    calculateGPA();
  }, [courseGrades]);

  const calculateGPA = () => {
    const validGrades = courseGrades.filter(grade => grade.grade !== '');
    const totalPoints = validGrades.reduce((sum, grade) => {
      return sum + (gradePoints[grade.grade] * grade.credits);
    }, 0);

    const totalCredits = validGrades.reduce((sum, grade) => sum + grade.credits, 0);
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setCumulativeGPA(Number(gpa.toFixed(2)));
  };

  const updateGrade = (courseId: string, grade: string) => {
    setCourseGrades(prev => 
      prev.map(cg => 
        cg.courseId === courseId ? { ...cg, grade } : cg
      )
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center mb-6">
        <Calculator className="mr-2" />
        GPA Calculator
      </h2>

      <div className="space-y-4">
        {courseGrades.map((course) => (
          <div 
            key={`grade-${course.courseId}`}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">{course.courseName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{course.credits} credits</p>
            </div>
            <select
              value={course.grade}
              onChange={(e) => updateGrade(course.courseId, e.target.value)}
              className="p-2 border rounded-md bg-white dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
            >
              <option value="">Select Grade</option>
              {Object.keys(gradePoints).map(grade => (
                <option key={`${course.courseId}-${grade}`} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        ))}

        {courseGrades.length > 0 && (
          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                Cumulative GPA
              </span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {cumulativeGPA}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPACalculator;