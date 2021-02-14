import React from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { RouteComponentProps } from 'react-router-dom';
import usePokemons from '../../services/pokemons';

const Pokemons = ({ history }: RouteComponentProps) => {
  const { pokemons } = usePokemons();
  return (
    <Box pt={11} pb={6}>
      <Box mb={3} display="flex">
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            history.push('/');
          }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <Box ml={2}>
          <Typography variant="h5">Pokemon List</Typography>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        style={{
          minWidth: 540,
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Height</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Avatar
                    alt={row.name}
                    src={row.sprites.other['official-artwork'].front_default}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.height}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Pokemons;
