import { Box, CircularProgress, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CompareItemProps } from '../base/compareItem/interface';
import CompareItem from '../base/compareItem/compareItem';
import EmptyBox from '../base/empty-box';
import { getComparedProductDetails } from '../../features/compare/compareThunk';

const Compare = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.compare);
  useEffect(() => {
    const compareItemsIds: string[] = JSON.parse(
      localStorage.getItem('compareItemsIds') || '[]'
    );
    dispatch(getComparedProductDetails(compareItemsIds));
  }, [dispatch]);
  return (
    <Box
      component={'div'}
      className="flex max-w-[1000px]  m-auto mt-20 overflow-x-scroll mb-20 rounded-xl"
    >
      <Box className="header min-w-[250px] ">
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold h-[300px] border-[1px] text-center flex items-center  p-2"
        >
          Product Image
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold border-[1px] border-t-0 h-12 text-start flex items-center  p-2"
        >
          Name
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold border-[1px] border-t-0 h-12 text-start flex items-center p-2"
        >
          Category
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold border-[1px] border-t-0 h-12 text-start flex items-center p-2 "
        >
          Ratings
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold border-[1px] border-t-0 h-12 text-start flex items-center p-2"
        >
          Price
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold border-[1px] border-t-0 h-16 text-start  flex items-center p-2"
        >
          on Stock
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold border-[1px] border-t-0 h-12 text-start  flex items-center p-2"
        >
          weight
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
          className="font-bold border-[1px] border-t-0 h-[170px] text-start  flex items-center p-2"
        >
          Description
        </Typography>
      </Box>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress className="self-center" color="primary" size={50} />
        </div>
      ) : (
        data.map((item: CompareItemProps) => {
          return (
            <CompareItem
              key={item.productId}
              svgLink={item.svgLink}
              productName={item.productName}
              productId={item.productId}
              categoryName={item.categoryName}
              rating={item.rating}
              reviewsCount={item.reviewsCount}
              price={item.price}
              weight={item.weight}
              description={item.description}
              stock={item.stock}
            />
          );
        })
      )}
      {!data.length && !loading  ? (
        <Box className="text-center w-full flex items-center justify-center bg-gray-200 text-3xl">
          <EmptyBox />
        </Box>
      ):""}
    </Box>
  );
};

export default Compare;
