const tasks = Array.from({ length: 197 }, (_, index) => ({
    id: index + 1,
    name: `Task ${index + 1}`,
    labels: index % 2 === 0 ? ["frontend", "urgent"] : ["backend", "low-priority"],
    status: index % 3 === 0 ? "CLOSED" : index % 2 === 0 ? "OPEN" : "IN PROGRESS",
    priority: index % 4 === 0 ? "MEDIUM" : "HIGH",
    assignee: `user${index}@company.com`,
    due_date: `2024-02-${String((index % 28) + 1).padStart(2, "0")}T00:00:00Z`,
    created_at: `2024-01-${String((index % 30) + 1).padStart(2, "0")}T12:00:00Z`,
    updated_at: `2024-01-${String((index % 30) + 1).padStart(2, "0")}T13:00:00Z`,
    comment: `This is comment for Task ${index + 1}`,
}));

export function fetchTasks(request) {
    const { page } = request;

    const offset = page?.offset || 0;
    const size = page?.size || 10;

    const paginatedTasks = tasks.slice(offset, offset + size);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                tasks: paginatedTasks,
                pagination: {
                    total: tasks.length,
                    has_next: offset + size < tasks.length,
                    page_size: size,
                    offset: offset,
                },
            });
        }, 500);
    });
}

export const fetchTasksForTab = async (offset, size) => {
  const response = await fetchTasks({
    page: { offset, size },
  });
  return response;
};
