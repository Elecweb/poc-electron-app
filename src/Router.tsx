import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListTodo from './pages/ListTodo';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import Pokemons from './pages/Pokemons';
import PokeDetail from './pages/PokeDetail';
import DeleteDialog from './modules/DeleteDialog';

const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/pokemons" component={Pokemons} />
        <Route path="/pokemon/:id" component={PokeDetail} />
        <Route path="/add" component={AddTodo} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/" component={ListTodo} />
      </Switch>
      <DeleteDialog />
    </>
  );
};
export default Router;
