import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { PiCommand, PiMagnifyingGlassBold } from 'react-icons/pi';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { useRouter } from '@tanstack/react-router';
import useMenuItems from '../../../hooks/useMenuitems';

const SearchDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { menu, loading } = useMenuItems();
  const { isSearchDialogOpen } = useSelector(
    (state: RootState) => state.common
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(
    menu.filter((item) => item.href)
  );

  // Filter menu items based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(menu.filter((item) => item.href));
    } else {
      const filtered = menu.filter(
        (item) =>
          item.href &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, menu]);

  // Handle keyboard shortcut (Window + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        dispatch({ type: 'common/setSearchDialogOpen', payload: true });
      }
      if (event.key === 'Escape' && isSearchDialogOpen) {
        dispatch({ type: 'common/setSearchDialogOpen', payload: false });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, isSearchDialogOpen]);

  const handleClose = () => {
    dispatch({ type: 'common/setSearchDialogOpen', payload: false });
    setSearchQuery('');
  };

  const handleItemClick = (href: string) => {
    router.navigate({ to: href });
    handleClose();
  };

  return (
    <Dialog
      open={isSearchDialogOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          maxWidth: '480px',
          maxHeight: '500px',
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'background.paper',
          }}
        >
          <TextField
            autoFocus
            fullWidth
            placeholder="Search pages here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PiMagnifyingGlassBold className="h-5 w-5 text-gray-500" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClose}
                    aria-label="close search"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { fontSize: '16px', borderRadius: '8px' },
            }}
          />
        </Box>

        {loading ? (
          <Box
            sx={{
              p: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={24} />
          </Box>
        ) : filteredItems.length > 0 ? (
          <List sx={{ py: 0 }} className="">
            {filteredItems.map((item, index) => (
              <ListItem
                key={`${item.name}-${index}`}
                button
                className="px-8"
                onClick={() => item.href && handleItemClick(item.href)}
                sx={{
                  py: 1.5,
                  '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
                }}
              >
                {item.icon && (
                  <ListItemIcon sx={{ minWidth: 20, color: 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={item.name}
                  className="font-Inria"
                  secondary={item.href}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    variant: 'body2',
                  }}
                  secondaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No results found for "{searchQuery}"
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Press ESC to close
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: '4px',
              px: 1,
              py: 0.5,
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <PiCommand className="h-3.5 w-3.5 mr-1" />K
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
