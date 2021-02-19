import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTodos } from '../../contexts/TodoDataProvider';

const AddTodo = ({ history }: RouteComponentProps) => {
  const [values, setValues] = React.useState({
    todoText: '',
  });

  const { setTodos } = useTodos();

  const handleTextChange = (prop: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setTodos(values.todoText);
    history.push('/   ');
  };

  return (
    <Container>
      <Card>
        <form>
          <Box width={400} px={4} py={4}>
            <Box display="flex        " mb={3} alignItems="center  ">
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
              <Typography variant="h6">Add Todo</Typography>
            </Box>
            <Box mb={3}>
              <TextField
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
                Add
              </Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default AddTodo;
