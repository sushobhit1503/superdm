import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Input, ModalFooter, Button } from 'reactstrap';
import { useRecoilState } from 'recoil';
import { tasksState } from './atoms';

const TaskModal = ({ task, isOpen, toggle }) => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [comment, setComment] = useState('');
  const [newStatus, setNewStatus] = useState(task.status);

  const updateStatus = () => {
    const updatedTasks = tasks.map(t => (t.id === task.id ? { ...t, status: newStatus, comment } : t));
    setTasks(updatedTasks);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '1') setNewStatus('OPEN');
      if (e.key === '2') setNewStatus('IN PROGRESS');
      if (e.key === '3') setNewStatus('CLOSED');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{task.name}</ModalHeader>
      <ModalBody>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Labels:</strong> {task.labels.join(", ")}</p>
        <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
        <p><strong>Created At:</strong> {new Date(task.created_at).toLocaleDateString()}</p>
        <Input
          type="select"
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
        >
          <option value="OPEN">Open</option>
          <option value="IN PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </Input>
        {newStatus !== task.status && (
          <Input
            type="textarea"
            placeholder="Add a comment"
            className='mt-3'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        )}
        <ModalFooter>
          <Button color='success' onClick={updateStatus}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default TaskModal;
