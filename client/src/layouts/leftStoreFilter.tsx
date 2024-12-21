import {
    FormControlLabel,
    TextField,
    Typography,
    Box,
    Checkbox,
    Grid,
    InputAdornment,
    Divider,
    FormGroup,
    Slider,
} from '@mui/material';
import { BiSearch } from 'react-icons/bi';

const StoreFilter = () => {
    return <>
        <Grid item lg={3} className=" rounded border "
              sx={{ marginTop: '20px', marginBottom: '20px', padding: '10px' }}>
            <Box>
                <Typography variant="h6" color="secondary.main">
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
            <Box>
                <Typography variant="h6" color="secondary.main">
                    Category
                </Typography>
                <Divider className="py-2" />
                <FormGroup className="p-4">
                    <FormControlLabel control={<Checkbox />} label="Label" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Disabled" />
                </FormGroup>
            </Box>
            <Box>
                <Typography variant="h6" color="secondary.main">
                    Weight
                </Typography>
                <Divider className="py-2" />
                <FormGroup className="p-4">
                    <FormControlLabel control={<Checkbox />} label="Label" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Disabled" />
                </FormGroup>
            </Box>
            <Box className="py-2">
                <Typography variant="h6" className="pb-2" color="secondary.main">
                    Price
                </Typography>
                <Box className="flex justify-center">
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
    </>;
};
export default StoreFilter;