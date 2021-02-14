import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { RouteComponentProps, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTodos } from '../../contexts/TodoDataProvider';

const EditTodo = ({ history }: RouteComponentProps) => {
  const { setTodos, getTodoById, setTodoById } = useTodos();

  const { id } = useParams<{ id: string }>();

  const todoItem = getTodoById({ id });

  const [values, setValues] = useState({
    todoText: todoItem.text,
  });

  const handleTextChange = (prop: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setTodoById({ id, text: values.todoText });
    history.push('/');
  };

  return (
    <Container>
      <Card>
        <form>
          <Box width={400} px={4} py={4}>
            <Box display="flex" mb={3} alignItems="center">
              <Box mr={1}>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  <ArrowBackIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <Typography variant="h6">Edit Todo</Typography>
            </Box>
            <Box mb={3}>
              <TextField
                value={values.todoText}
                multiline
                fullWidth
                label="Whatcha gon’do"
                onChange={handleTextChange('todoText')}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default EditTodo;
