import React from 'react';
import { Box, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Divider, InputAdornment, Slider, Grid, Button, Menu, MenuItem } from '@mui/material';
import PathBar from '../../base/pathbar/pathbar';
import PromoCard from '../../base/PromoCard/PromoCard';
import { BiSearch } from 'react-icons/bi';
import CategoryCardContainer from '../categoryCardContainer/categoryCardContainer';
const Store: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <PathBar path={'Home > Store'} />
            <Box className=" max-w-[1200px] mt-8 m-auto grid grid-cols-1 xl:grid-cols-2 gap-4" >
                <Box className="w-full" >
                    <PromoCard image={'/assets/images/storebanner1.jpg'} title={'Fresh Fruits'} subtitle={'Special flavor.'} discountText={'Limited time: 10% off!'} buttonText={'Shop now'} />
                </Box>
                <Box className="w-full" >
                    <PromoCard image={'/assets/images/storebanner2.jpg'} title={'Fastfood'} subtitle={'Healthy meal.'} discountText={'Limited time: 10% off!'} buttonText={'Shop now'} />
                </Box>
            </Box>

            <CategoryCardContainer />
            <Grid container gap={2} maxWidth={1200} sx={{ margin: 'auto' }}  >
                <Grid item lg={3} className=' rounded border ' sx={{ marginTop: '20px', marginBottom: '20px', padding: '10px' }} >
                    <Box >
                        <Typography variant='h6' color='secondary.main'>
                            Search
                            <TextField
                                sx={{ padding: '10px' }}
                                variant="outlined"
                                fullWidth
                                placeholder="Search for a product"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <BiSearch
                                                className={
                                                    'hover:bg-primary-main rounded-full w-8 h-8 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main '
                                                }
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Typography>
                    </Box>
                    <Box >
                        <Typography variant='h6' color='secondary.main'>
                            Category
                        </Typography>
                        <Divider className='py-2' />
                        <FormGroup className='p-4'>
                            <FormControlLabel control={<Checkbox />} label="Label" />
                            <FormControlLabel control={<Checkbox />} label="Required" />
                            <FormControlLabel control={<Checkbox />} label="Disabled" />
                        </FormGroup>
                    </Box>
                    <Box >
                        <Typography variant='h6' color='secondary.main'>
                            Weight
                        </Typography>
                        <Divider className='py-2' />
                        <FormGroup className='p-4'>
                            <FormControlLabel control={<Checkbox />} label="Label" />
                            <FormControlLabel control={<Checkbox />} label="Required" />
                            <FormControlLabel control={<Checkbox />} label="Disabled" />
                        </FormGroup>
                    </Box>
                    <Box >
                        <Typography variant='h6' color='secondary.main'>
                            Sort By
                        </Typography>
                        <Divider className='py-2' />
                        <FormGroup className='p-4'>
                            <FormControlLabel control={<Checkbox />} label="Label" />
                            <FormControlLabel control={<Checkbox />} label="Required" />
                            <FormControlLabel control={<Checkbox />} label="Disabled" />
                        </FormGroup>
                    </Box>
                    <Box className='py-2' >
                        <Typography variant='h6' className='pb-2' color='secondary.main'>
                            Price
                        </Typography>
                        <Box className='flex justify-center'>
                            <Slider
                                sx={{ width: '80%', padding: '5px' }}
                                getAriaLabel={() => 'Temperature range'}
                                /*value={}
                                onChange={} */
                                valueLabelDisplay="auto"
                            /*getAriaValueText={} */
                            />
                        </Box>

                    </Box>
                </Grid>
                <Grid item lg={8.5} sx={{ marginTop: '20px', paddingTop: '0px' }} >
                    <Grid item spacing={2} lg={12} >
                        <Box className='w-full flex border p-4 items-start justify-end gap-2 h-max' >
                            <div>
                                <Button
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    color={'secondary'}
                                    sx={{ paddingX: "", width: '120px' }}
                                    variant='outlined'
                                    className='w-16 h-12'
                                >
                                    sort by
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </Menu>
                            </div>
                            <Button variant='contained' color='primary' className='h-12' >
                                clear filter
                            </Button>
                        </Box>
                    </Grid>


                </Grid>
            </Grid>
        </>
    );
};

export default Store;