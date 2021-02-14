import React from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Container,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { RouteComponentProps } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useTodos } from '../../contexts/TodoDataProvider';

const Wrapper = styled(Container)`
  > * {
    margin-top: 2px;
    margin-bottom: 24px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListTodo = ({ history }: RouteComponentProps) => {
  const { todos, setTodoById, setDeleting } = useTodos();

  return (
    <Wrapper maxWidth="sm">
      <Actions>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginRight: 16,
          }}
          onClick={() => {
            history.push('/add');
          }}
        >
          Add Todo
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push('/pokemons');
          }}
        >
          See pokemons
        </Button>
      </Actions>
      <Box minWidth={400}>
        {todos.length <= 0 ? (
          <Card>
            <Box px={5} py={4}>
              <Typography
                variant="h5"
                style={{
                  color: '#999999',
                  textAlign: 'center',
                }}
              >
                You have nothing todo.
              </Typography>
            </Box>
          </Card>
        ) : (
          <Card>
            <Box px={3} py={2} minWidth={500}>
              {todos.map((item) => (
                <Box
                  display="flex"
                  alignItems="center"
                  key={item.id}
                  my={2}
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={item.isChecked}
                      onChange={(event) => {
                        setTodoById({
                          id: item.id,
                          isChecked: event.target.checked,
                        });
                      }}
                    />
                    <Box ml={1}>
                      <Typography variant="body1">{item.text}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      aria-label="delete"
                      style={{
                        marginRight: 16,
                      }}
                      color="secondary"
                      onClick={() => {
                        history.push(`/edit/${item.id}`);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      style={{
                        color: '#e53935',
                      }}
                      onClick={() => {
                        setDeleting(item.id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        )}
      </Box>
    </Wrapper>
  );
};

export default ListTodo;
