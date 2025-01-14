import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeTabState, taskCountsState, tasksState } from './atoms';
import { fetchTasksForTab } from './api';

const TaskTabs = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const setTaskCounts = useSetRecoilState(taskCountsState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [count, setCount] = useState (0)

  useEffect(() => {
    const fetchCounts = async () => {
      const statuses = ['OPEN', 'IN PROGRESS', 'CLOSED'];
      const counts = {};

      for (const status of statuses) {
        const response = await fetchTasksForTab(0, 197);
        counts[status] = response.tasks.filter(task => task.status === status).length;
      }

      setTaskCounts(counts);
      setCount(counts)
    };

    fetchCounts();
  }, [tasks]);

  return (
    <Nav tabs>
      {['OPEN', 'IN PROGRESS', 'CLOSED'].map(status => (
        <NavItem key={status}>
          <NavLink
            active={activeTab === status}
            onClick={() => setActiveTab(status)}
          >
            {status} ({count[status] || 0})
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default TaskTabs;
