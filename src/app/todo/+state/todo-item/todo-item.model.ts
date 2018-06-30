export interface TodoItem {
  id: number;
  taskTitle: string;
  projectName: string;
  priority: 1 | 2 | 3 | 4;
  description: string;
}
