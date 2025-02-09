import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { TopCostumers } from '../../../types/storeAnalytics';

const TopCostumersBase = ({ costumers }: { costumers: TopCostumers[] }) => {
  return (
    <Card className="border-[1px] shadow-none mt-6 rounded-[5px] h-[500px]">
      <CardHeader title={<Typography variant="h6" className=''>Top Costumers</Typography>} />
      <CardContent>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {/* Header Row */}
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="body1"
              fontWeight="medium"
              color="text.secondary"
            >
              Costumer Name
            </Typography>
            <Typography
              variant="body1"
              fontWeight="medium"
              color="text.secondary"
            >
              Total spent
            </Typography>
          </ListItem>

          {costumers.map((costumer, index) => (
            <React.Fragment key={costumer.id}>
              <ListItem
                sx={{
                  py: 2,
                  display: 'flex',
                  justifyContent: 'space-between',

                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        width: 60,
                        height: 60,
                      }}
                      src={costumer.avatar}
                    >
                      {costumer.name}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ textTransform: 'capitalize' }}
                        className="text-primary-main"
                      >
                        {costumer.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        className="text-secondary-main"
                      >
                        {costumer.email}
                      </Typography>
                    }
                  />
                </Box>
                <Typography variant="body1" fontWeight="medium">
                  ${costumer.totalSpent.toFixed(2) || 0}
                </Typography>
              </ListItem>

              {index !== costumers.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopCostumersBase;
