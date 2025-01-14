import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const tasksState = atom({
  key: 'tasksState',
  default: [], // Array of tasks fetched from the API
});

export const activeTabState = atom({
  key: 'activeTabState',
  default: 'OPEN', // Default tab
  effects_UNSTABLE: [persistAtom]
});

export const taskCountsState = atom({
  key: 'taskCountsState',
  default: { OPEN: 0, 'IN PROGRESS': 0, CLOSED: 0 }, // Default task counts
});

export const paginationState = atom({
  key: 'paginationState',
  default: {
    offset: 0,
    size: 50,
    hasNext: true,
  },
});

export const sortingState = atom({
  key: 'sortingState',
  default: { field: 'createdAt', order: '' }, // Sorting default by Created At
  effects_UNSTABLE: [persistAtom]
});

export const searchState = atom({
  key: 'searchState',
  default: '',
  effects_UNSTABLE: [persistAtom]
});
