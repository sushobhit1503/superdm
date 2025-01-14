import React from 'react';
import { Input, Button } from 'reactstrap';
import { useRecoilState } from 'recoil';
import { searchState } from './atoms';

const SearchBar = () => {
  const [search, setSearch] = useRecoilState(searchState);

  const clearSearch = () => setSearch('');

  return (
    <div className="d-flex mb-3">
      <Input
        type="text"
        placeholder="Search tasks by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Button color="secondary" onClick={clearSearch} className="ms-2">
        Clear
      </Button>
    </div>
  );
};

export default SearchBar;
