import { Fragment, useEffect, useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import {
  Box,
  CircularProgress,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { PiCaretDownBold } from 'react-icons/pi';
import Logo from '../../icons/logo';
import useMenuItems, { MenuItemType } from '../../../hooks/useMenuitems';

const SidebarDrawer = styled(Drawer)(({ theme }) => ({
  width: 270,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 290,
    borderRight: '2px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ActiveIndicator = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  height: '80%',
  width: '4px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '0 4px 4px 0',
}));

export default function Sidebar() {
  const theme = useTheme();
  const router = useRouter();
  const { menu, loading } = useMenuItems();
  const [currentPath, setCurrentPath] = useState(
    router.state.location.pathname
  );
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  // Listen for route changes and update `currentPath`
  useEffect(() => {
    const unsubscribe = router.subscribe('onResolved', ({ toLocation }) => {
      setCurrentPath(toLocation.pathname);
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  const handleDropdownToggle = (itemName: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  const isActive = (href?: string) => currentPath === href;
  return (
    <SidebarDrawer variant="permanent">
      <Box
        sx={{
          px: 3,
          backgroundColor: theme.palette.background.default,
        }}
        className={'py-8 h-20'}
      >
        <Link to="/Economa">
          <Logo />
        </Link>
      </Box>

      <div className="h-full group relative overflow-hidden">
        <div className="h-full overflow-hidden group-hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 ">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <List component="nav" sx={{ pt: 2 }}>
              {
                menu.map((item: MenuItemType, index) => {
                const isOpen = openDropdowns[item.name];

                if (!item.href && !item.dropdownItems) {
                  return (
                    <Typography
                      key={`title-${index}`}
                      variant="caption"
                      sx={{
                        px: 3,
                        py: 1,
                        display: 'block',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: theme.palette.text.secondary,
                        ...(index !== 0 && { mt: 3 }),
                      }}
                    >
                      {item.name}
                    </Typography>
                  );
                }

                return (
                  <Fragment key={item.name + '-' + index}>
                    {/* Render dropdown or standard item */}
                    {item.dropdownItems ? (
                      <>
                        <ListItemButton
                          onClick={() => handleDropdownToggle(item.name)}
                          sx={{
                            mx: 1,
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'action.hover' },
                          }}
                        >
                          {item.icon && (
                            <ListItemIcon
                              sx={{
                                minWidth: 40,
                                color: 'inherit',
                                marginRight: 0,
                                fontSize: '20px',
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                          )}

                          <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              fontSize: '14px',
                            }}
                          />

                          <PiCaretDownBold
                            strokeWidth={3}
                            style={{
                              transform: isOpen
                                ? 'rotate(0deg)'
                                : 'rotate(-90deg)',
                              transition: 'transform 0.2s',
                              fontSize: '0.875rem',
                            }}
                          />
                        </ListItemButton>

                        <Collapse in={isOpen} timeout="auto">
                          <List component="div" disablePadding>
                            {item.dropdownItems.map(
                              (dropdownItem: any, idx: number) => (
                                <ListItemButton
                                  key={dropdownItem.name + idx}
                                  component={Link}
                                  to={dropdownItem.href}
                                  sx={{
                                    pl: 6,
                                    mx: 1,
                                    borderRadius: 1,
                                    '&:hover': {
                                      backgroundColor: 'action.hover',
                                    },
                                    ...(isActive(dropdownItem.href) && {
                                      color: 'primary.main',
                                      fontWeight: 500,
                                    }),
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: '50%',
                                      mr: 1.5,
                                      ...(isActive(dropdownItem.href)
                                        ? {
                                            bgcolor: 'primary.main',
                                            boxShadow: '0 0 0 1px primary.main',
                                          }
                                        : {
                                            bgcolor: 'text.disabled',
                                            opacity: 0.4,
                                          }),
                                    }}
                                  />
                                  <ListItemText primary={dropdownItem.name} />
                                </ListItemButton>
                              )
                            )}
                          </List>
                        </Collapse>
                      </>
                    ) : (
                      <ListItemButton
                        component={Link}
                        to={item.href}
                        sx={{
                          mx: 1,
                          borderRadius: 1,
                          '&:hover': { backgroundColor: 'action.hover' },
                          ...(isActive(item.href) && {
                            color: 'primary.main',
                          }),
                        }}
                      >
                        {isActive(item.href) && <ActiveIndicator />}

                        {item.icon && (
                          <ListItemIcon
                            sx={{
                              minWidth: 40,
                              color: 'inherit',
                              marginRight: 0,
                              fontSize: '20px',
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                        )}

                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{
                            fontWeight: 500,
                            fontSize: '14px',
                          }}
                        />
                      </ListItemButton>
                    )}
                  </Fragment>
                );
              })}
          </List>
          )}
        </div>
      </div>
    </SidebarDrawer>
  );
}
