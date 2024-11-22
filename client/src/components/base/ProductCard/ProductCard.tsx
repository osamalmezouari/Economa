import {
  Badge,
  Box,
  Rating,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { GrView } from 'react-icons/gr';
import { IoGitCompare, IoBagAdd, IoHeart } from 'react-icons/io5';
import { ProductCardType } from '../../../interfaces/product';
import ProductDialog from '../productDialog/ProductDialog';
import { useState } from 'react';

export default function ProductCard({
  id,
  discount,
  name,
  categoryName,
  description,
  productAvgRaiting,
  price,
  priceWithDiscount,
  imageLink,
  unit,
}: ProductCardType) {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState<ProductCardType | {}>();

  const handleOpen = (data: ProductCardType) => {
    setOpen(!open);
    setDialogData(open ? {} : { ...data });
  };

  return (
    <Card
      sx={{
        maxWidth: 280,
        borderRadius: '2px',
        border: '2px solid #eeeeee',
        margin: 'auto',
      }}
      className="group relative overflow-hidden"
    >
      <CardMedia
        sx={{ height: 240 }}
        className="bg-cover bg-center border-b-2 relative group-hover:scale-105 transition-transform duration-300"
        image={imageLink}
        title={name}
      >
        <div className="absolute top-2 right-4">
          <Badge className="bg-red-400 text-white rounded-sm px-2 uppercase text-[12px]">
            - {discount} %
          </Badge>
        </div>
        <div className="absolute top-2 left-4">
          <Badge className="bg-green-400 text-white rounded-sm px-2 uppercase text-[12px]">
            1 {unit}
          </Badge>
        </div>
      </CardMedia>

      <Box className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 w-7/12 flex h-max top-[240px] group-hover:top-[190px] hover:z-10 items-center mx-auto justify-between bg-slate-100 p-2 rounded-xl">
        <div className="border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent">
          <IoBagAdd fontSize={16} />
        </div>
        <div
          className="border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent"
          onClick={() =>
            handleOpen({
              id,
              discount,
              name,
              categoryName,
              description,
              productAvgRaiting,
              price,
              priceWithDiscount,
              imageLink,
              unit,
            })
          }
        >
          <GrView fontSize={16} />
        </div>
        <div className="border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent">
          <IoGitCompare fontSize={16} />
        </div>
        <div className="border-2 p-1 text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent">
          <IoHeart fontSize={16} />
        </div>
      </Box>

      <CardContent sx={{ padding: '5px 10px' }}>
        <p className="my-1 text-secondary-lighter capitalize">
          {categoryName} - {name}
        </p>
        <p className="text-secondary-main capitalize mb-3 max-h-6 overflow-hidden text-[14px] hover:text-primary-main cursor-pointer transition-colors duration-500">
          {description} ...
        </p>
        <Rating
          name="half-rating"
          size="small"
          defaultValue={productAvgRaiting}
          precision={0.5}
        />
        <Box className="flex gap-8 text-secondary-main">
          <p className="text-secondary-main font-bold">${priceWithDiscount}</p>
          <p className="line-through">${price}</p>
        </Box>
      </CardContent>

      {open && (
        <ProductDialog
          open={open}
          setopen={setOpen}
          {...(dialogData as ProductCardType)}
        />
      )}
    </Card>
  );
}
