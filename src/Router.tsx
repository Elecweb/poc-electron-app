import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListTodo from './pages/ListTodo';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import Pokemons from './pages/Pokemons';
import DeleteDialog from './modules/DeleteDialog';

const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/pokemons" component={Pokemons} />
        <Route path="/add" component={AddTodo} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/" component={ListTodo} />
      </Switch>
      <DeleteDialog />
    </>
  );
};
export default Router;
