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
import { TopSellingProducts } from '../../../types/storeAnalytics';

const TopProductsBase = ({ products }: { products: TopSellingProducts[] }) => {
  return (
    <Card className="border-[1px] shadow-none mt-6 rounded-[5px] h-[500px]">
      <CardHeader
        title={
          <Typography variant="h6" className="">
            Top Selling Products
          </Typography>
        }
      />
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
              Product Name
            </Typography>
            <Typography
              variant="body1"
              fontWeight="medium"
              color="text.secondary"
            >
              Sales Values
            </Typography>
          </ListItem>

          {products.map((product, index) => (
            <React.Fragment key={product.productId}>
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
                        width: 40,
                        height: 40,
                      }}
                      src={product.productImage}
                    >
                      {product.productName}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {product.productName}
                      </Typography>
                    }
                  />
                </Box>
                <Typography variant="body1" fontWeight="medium">
                  ${product.totalSales.toFixed(2) || 0}
                </Typography>
              </ListItem>

              {index !== products.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopProductsBase;
