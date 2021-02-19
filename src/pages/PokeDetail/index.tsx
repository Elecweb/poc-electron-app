import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import HeightIcon from '@material-ui/icons/Height';
import { RouteComponentProps, useParams } from 'react-router-dom';
import usePokemon from '../../services/pokemon';

const PokeDetail = ({ history }: RouteComponentProps) => {
  const { id } = useParams<{ id: string }>();
  const { pokemon } = usePokemon(id);
  // const { typePoke } =  pokemon?.types;
  console.log('pokemon', pokemon);
  console.log('Types', pokemon?.types);
  // console.log('Type', pokemon?.types.type);

  return (
    <Box pt={11} pb={6}>
      <Box mb={3} display="flex">
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            history.push('/pokemons');
          }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <Box ml={2}>
          <Typography variant="h5">{pokemon.name}</Typography>
        </Box>
      </Box>
      <Card>
        <Box width={400} px={4} py={4}>
          <Box display="flex" alignItems="center" flexDirection="column">
            <img
              width={250}
              alt={pokemon.name}
              src={pokemon?.sprites?.other?.dream_world?.front_default}
            />
            {/* <Typography variant="h5"> {pokemon.name}</Typography> */}
          </Box>
          <Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <HeightIcon />
                </ListItemIcon>

                <ListItemText primary="height" secondary={pokemon.height} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FitnessCenterIcon />
                </ListItemIcon>
                <ListItemText primary="weight" secondary={pokemon.weight} />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="contacts">
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Special Skill" />
              </ListItem>
              {pokemon.types !== undefined &&
                pokemon.types.map((item, index) => (
                  <ListItem key={item.type.name}>{item.type.name}</ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default PokeDetail;
