export interface TodoItem {
  id: string;
  taskTitle: string;
  projectName: string;
  priority: 1 | 2 | 3 | 4;
  description: string;
}
