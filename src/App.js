import React, { useState } from 'react';
import TaskTabs from './TaskTabs';
import TaskTable from './TaskTable';
import TaskModal from './TaskModal';
import SearchBar from './SearchBar';
import SortingBar from './SortingBar';
import './App.css';

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="main-container">
      <h1 className="my-4">Task Manager</h1>
      <TaskTabs />
      <div className="my-3">
        <SearchBar />
        <SortingBar />
      </div>
      <TaskTable selectedTask={selectedTask} onTaskSelect={task => setSelectedTask(task)} />
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={selectedTask}
          toggle={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default App;
