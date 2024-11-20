import { Badge, Box, Button, Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { GrView } from 'react-icons/gr';
import { IoIosGitCompare } from "react-icons/io";
import { IoBagAdd, IoHeart } from 'react-icons/io5';

export default function ProductCard() {
    return (
        <Card
            sx={{ maxWidth: 280, borderRadius: "2px", border: "2px solid #eeeeee" }}
            className="group relative overflow-hidden"
        >
            <CardMedia
                sx={{ height: 240 }}
                className="bg-cover bg-center border-b-2 p-2 relative group-hover:scale-105 transition-transform duration-300"
                image="https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product1.jpg?raw=true"
                title="green iguana"
            >
                <div className="absolute top-2 right-2">
                    <Badge
                        className="bg-red-400 text-white rounded-sm px-2 uppercase text-[12px]"
                    >
                        sale
                    </Badge>
                </div>
            </CardMedia>
            <Box className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-all  duration-300  w-8/12 flex h-max  top-[240px] group-hover:top-[200px] hover:z-10  items-center mx-auto justify-between">
                <div className='border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent' ><IoBagAdd fontSize={20} /></div>
                <div className='border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent'><GrView fontSize={20} /></div>
                <div className='border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent'><IoIosGitCompare fontSize={20} /></div>
                <div className='border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent'><IoHeart fontSize={20} /></div>
            </Box>
            <CardContent sx={{ padding: "5px 10px" }}>
                <p className="my-1 text-secondary-lighter">
                    Fruits
                </p>
                <p className="text-secondary-main capitalize mb-8">
                    Lizards are a widespread group
                </p>
                <Rating name="half-rating" size="small" defaultValue={2.5} precision={0.5} />
                <Box className="flex gap-8 text-secondary-main">
                    <p className="text-secondary-main font-bold">$45.60</p>
                    <p>$45.60</p>
                </Box>
            </CardContent>
        </Card>
    );
}
