import React, { useMemo } from 'react';
import ReactFlow, { Node, Edge, Background, Controls, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

interface Course {
  name: string;
  crn: string;
  professor: string;
  time: string;
}

interface ScheduleFlowProps {
  courses: Course[];
}

const ScheduleFlow: React.FC<ScheduleFlowProps> = ({ courses }) => {
  const nodes: Node[] = useMemo(() => 
    courses.map((course, index) => ({
      id: course.crn,
      type: 'default',
      data: {
        label: (
          <div className="p-4 text-center">
            <div className="font-bold text-indigo-700 dark:text-indigo-300">{course.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{course.professor}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{course.time}</div>
          </div>
        )
      },
      position: {
        x: 150 + Math.cos(((2 * Math.PI) / courses.length) * index) * 200,
        y: 300 + Math.sin(((2 * Math.PI) / courses.length) * index) * 200
      },
      style: {
        background: '#f3e8ff',
        border: '2px solid #8b5cf6',
        borderRadius: '12px',
        padding: '4px',
        width: 200,
      },
    })),
    [courses]
  );

  const edges: Edge[] = useMemo(() => 
    courses.flatMap((course, index) => {
      const connections = [];
      for (let i = 0; i < courses.length; i++) {
        if (i !== index) {
          connections.push({
            id: `e${course.crn}-${courses[i].crn}`,
            source: course.crn,
            target: courses[i].crn,
            animated: true,
            style: { stroke: '#8b5cf6', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#8b5cf6',
            },
          });
        }
      }
      return connections;
    }),
    [courses]
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" style={{ height: '600px' }}>
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">Schedule Flow</h2>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        className="bg-gray-50 dark:bg-gray-900 rounded-lg"
      >
        <Background color="#8b5cf6" gap={16} size={1} />
        <Controls className="bg-white dark:bg-gray-800" />
      </ReactFlow>
    </div>
  );
};

export default ScheduleFlow;