import { useState } from 'react';
import { Box, Grid, Button, MenuItem, Menu } from '@mui/material';

const TopStoreFilter = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <>
        <>
            <Box className="w-full flex border p-4 items-start justify-end gap-2 h-max">
                <div>
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color={'secondary'}
                        sx={{ paddingX: '', width: '120px' }}
                        variant="outlined"
                        className="w-16 h-12"
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
                <Button variant="contained" color="primary" className="h-12">
                    clear filter
                </Button>
            </Box>
        </>
    </>;
};
export default TopStoreFilter;