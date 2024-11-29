import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { NavItemsProps } from './interfaces';

const Desktop_nav_bar = ({ NavItems }: NavItemsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack className={'border-b-2 bg-gray'}>
        <Container style={{ maxWidth: '1200px' }}>
          <Grid container spacing={2} className={'px-8 items-center'}>
            <Grid size={2}>
              <Box
                component={'img'}
                src={NavItems.logo}
                className="w-[140px] h-[140px] scale-[1.5]"
                alt="logo"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for a product"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={4} gap={'6'}>
              {NavItems.ItemsRight.map((item) => {
                return (
                  <>
                    {' '}
                    <Button
                      variant="text"
                      className="w-28 bg-secondary-darker ml-2 h-14 hover:border-2 "
                      startIcon={item.icon}
                      onClick={() => navigate(item.link)}
                    >
                      <p className="text-secondary-darker font-secondary">
                        {item.name}
                      </p>
                    </Button>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Stack>
      <Grid
        container
        sx={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          borderBottom: '1px',
          borderColor: '#C4CDD5',
          borderStyle: 'solid',
        }}
      >
        {NavItems.itemsCenter.map((item) => {
          return (
            <>
              {' '}
              <Button
                className="flex gap-2 w-28 bg-main-main ml-2 h-14"
                startIcon={item.icon}
                onClick={() => navigate(item.link)}
              >
                <p className="text-secondary-darker font-main">{item.name}</p>
              </Button>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default Desktop_nav_bar;
