import React from 'react';
import {
    Box,
} from '@mui/material';
import PathBar from '../../base/pathbar/pathbar';
import PromoCard from '../../base/PromoCard/PromoCard';
import CategoryCardContainer from '../categoryCardContainer/categoryCardContainer';

const StoreTopSection: React.FC = () => {

    return (
        <>
            <PathBar path={'Home > Store'} />
            <Box className=" max-w-[1200px] mt-8 m-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Box className="w-full">
                    <PromoCard image={'/assets/images/storebanner1.jpg'} title={'Fresh Fruits'}
                               subtitle={'Special flavor.'} discountText={'Limited time: 10% off!'}
                               buttonText={'Shop now'} />
                </Box>
                <Box className="w-full">
                    <PromoCard image={'/assets/images/storebanner2.jpg'} title={'Fastfood'} subtitle={'Healthy meal.'}
                               discountText={'Limited time: 10% off!'} buttonText={'Shop now'} />
                </Box>
            </Box>

            <CategoryCardContainer />

        </>
    );
};

export default StoreTopSection;