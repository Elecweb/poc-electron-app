import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useTodos } from '../../contexts/TodoDataProvider';

const DeleteDialog = () => {
  const { deleting, getTodoById, setDeleting, deleteTodo } = useTodos();

  console.log('deleting=>', deleting);

  const todoItem = deleting ? getTodoById({ id: deleting }) : null;

  const open = !!deleting;

  const handleDismiss = () => {
    setDeleting(null);
  };

  const handleConfirm = () => {
    deleteTodo(deleting as string);
    setDeleting(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleDismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Hey, you gonna delete this one ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {todoItem?.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDismiss} color="primary">
          Nah
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Yeah
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
