import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tasksState, activeTabState, paginationState, searchState, sortingState } from './atoms';
import { fetchTasksForTab } from './api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Badge, Table } from 'reactstrap';
import { keyHandleDisable } from './utils';

const TaskTable = ({ selectedTask, onTaskSelect }) => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const activeTab = useRecoilValue(activeTabState);
  const [pagination, setPagination] = useRecoilState(paginationState);
  const searchBar = useRecoilValue(searchState);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const sortBar = useRecoilValue(sortingState);

  const filteredTasks = tasks
    .filter(task =>
      task.name.toLowerCase().includes(searchBar.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortBar.order === 'asc' ? dateB - dateA : dateA - dateB;
    });
  const filteredTasksByTab = filteredTasks.filter(task => task.status === activeTab);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialTasks = async () => {
      setLoading(true);
      const response = await fetchTasksForTab(0, pagination.size);
      setTasks(response.tasks);
      setPagination({
        offset: pagination.size,
        size: pagination.size,
        hasNext: response.pagination.has_next,
      });
      setLoading(false);
      setSelectedRowIndex(null);
    };
    fetchInitialTasks();
  }, [activeTab, setTasks, setPagination, pagination.size]);

  const fetchMoreTasks = async () => {
    if (!pagination.hasNext) return;

    const response = await fetchTasksForTab(pagination.offset, pagination.size);
    setTasks(prev => [...prev, ...response.tasks]);
    setPagination(prev => ({
      ...prev,
      offset: prev.offset + pagination.size,
      hasNext: response.pagination.has_next,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(filteredTasksByTab.length);
      if (filteredTasksByTab.length === 0) {
        setSelectedRowIndex(null);
        return;
      }
      if (!keyHandleDisable()) {
        if (e.key === 'ArrowDown') {
          setSelectedRowIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, tasks.length - 1)));
        } else if (e.key === 'ArrowUp') {
          setSelectedRowIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
        } else if (e.key === 'Enter' && selectedRowIndex !== null) {
          onTaskSelect(filteredTasksByTab[selectedRowIndex]);
        }
        if (e.key === 'ArrowRight' && selectedTask) {
          setSelectedRowIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, tasks.length - 1)));
          onTaskSelect(filteredTasksByTab[selectedRowIndex]);
        } else if (e.key === 'ArrowLeft' && selectedTask) {
          setSelectedRowIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
          onTaskSelect(filteredTasksByTab[selectedRowIndex]);
        }
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tasks, selectedRowIndex, onTaskSelect, filteredTasksByTab]);

  return (
    <InfiniteScroll
      dataLength={tasks.length}
      next={fetchMoreTasks}
      hasMore={pagination.hasNext}
      loader={<p>Loading...</p>}
    >
      <Table hover bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Priority</th>
            <th>Name</th>
            <th>Status</th>
            <th>Labels</th>
            <th>Due Date</th>
            <th>Created At</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasksByTab.map((task, index) => (
            <tr key={task.id} onClick={() => onTaskSelect(task)} className={index === selectedRowIndex ? 'table-active' : ''}>
              <td>{task.id}</td>
              <td>
                {task.priority === 'HIGH' ? (
                  <Badge color='danger'>High</Badge>
                ) : (
                  <Badge color='warning'>Medium</Badge>
                )}
              </td>
              <td>{task.name}</td>
              <td>
                {task.status === 'OPEN' ? (
                  <Badge color='success'>Open</Badge>
                ) : task.status === "CLOSED" ? (
                  <Badge color='danger'>Closed</Badge>
                ) : (<Badge color='warning'>In Progress</Badge>)}
              </td>
              <td>
                <div className='d-flex gap-3'>
                  {task.labels.map(eachLabel => <Badge color='info'>{eachLabel}</Badge>)}
                </div>
              </td>
              <td>{new Date(task.due_date).toLocaleDateString()}</td>
              <td>{new Date(task.created_at).toLocaleDateString()}</td>
              <td>{task.assignee}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </InfiniteScroll>
  );
};

export default TaskTable;
