import React, { useContext, useState } from 'react';

type TodoDataProviderProps = {
  children: React.ReactNode;
};

type TodoItem = {
  isChecked: boolean;
  text: string;
  id: string;
};

type TodoDataContextProps = {
  todos: TodoItem[];
  setTodos: (value: string) => void;
  setTodoById: (prop: Partial<TodoItem>) => void;
  getTodoById: (prop: Partial<TodoItem>) => TodoItem;
  deleting: string | null;
  setDeleting: (id: string | null) => void;
  deleteTodo: (id: string) => void;
};

const TodoDataContext = React.createContext<TodoDataContextProps>(
  {} as TodoDataContextProps
);

const TodoDataProvider = ({ children }: TodoDataProviderProps) => {
  const [todos, setTodosState] = useState<TodoItem[]>([]);
  const [deleting, setDeletingState] = useState<string | null>(null);

  const setTodos = (value: string) => {
    setTodosState([
      ...todos,
      {
        id: `${new Date().getTime()}`,
        isChecked: false,
        text: value,
      },
    ]);
  };

  const setTodoById = (prop: Partial<TodoItem>) => {
    const updatedItemIndex = todos.findIndex((item) => item.id === prop.id);
    if (updatedItemIndex >= 0) {
      const copiedTodos = [...todos];
      copiedTodos[updatedItemIndex] = {
        ...todos[updatedItemIndex],
        isChecked: prop.isChecked ?? copiedTodos[updatedItemIndex].isChecked,
        text: prop.text ?? copiedTodos[updatedItemIndex].text,
      };
      setTodosState(copiedTodos);
    }
  };

  const getTodoById = (prop: Partial<TodoItem>) => {
    const itemIndex = todos.findIndex((item) => item.id === prop.id);
    return todos[itemIndex];
  };

  const setDeleting = (id: string | null) => {
    setDeletingState(id);
  };

  const deleteTodo = (id: string) => {
    setTodosState(todos.filter((item) => item.id !== id));
  };

  return (
    <TodoDataContext.Provider
      value={{
        todos,
        setTodos,
        setTodoById,
        deleteTodo,
        getTodoById,
        deleting,
        setDeleting,
      }}
    >
      {children}
    </TodoDataContext.Provider>
  );
};

export const useTodos = () => {
  const types = useContext(TodoDataContext);
  return types;
};

export default TodoDataProvider;
