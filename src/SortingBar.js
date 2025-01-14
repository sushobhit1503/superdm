import React from 'react';
import { Button } from 'reactstrap';
import { useRecoilState } from 'recoil';
import { sortingState } from './atoms';

const SortingBar = () => {
  const [sorting, setSorting] = useRecoilState(sortingState);

  const toggleSortingOrder = () => {
    setSorting(prev => ({
      field: prev.field,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const clearSorting = () => {
    setSorting({ field: 'createdAt', order: '' });
  };

  return (
    <div className="d-flex mb-3">
      <Button color="primary" onClick={toggleSortingOrder}>
        Sort: Task List ({sorting.order === 'asc' ? 'Newest' : 'Older'})
      </Button>
      <Button color="secondary" onClick={clearSorting} className="ms-2">
        Clear Sorting
      </Button>
    </div>
  );
};

export default SortingBar;
