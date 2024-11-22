import { Badge, Box } from "@mui/material";
import Card from "@mui/material/Card";
import { CategorySignleProps } from "./interfaces";

const CategoryCardSingle = ({ svgLink, linkTo, productsCount, name, description }: CategorySignleProps) => {
    const calors: string[] = ['#e2fde2', '#fee9e8', '#fdf4ea', '#F9DEF2', 'fdf5eb']
    const randomColor = calors[Math.floor(Math.random() * calors.length)];

    return (
        <Box component={'div'} className={`p-3 rounded`} style={{ backgroundColor: `${randomColor}` }}>
            <Card
                className="w-[180px] h-[160px]  bg-secondary-darker"
            >
                <Badge className="rounded px-3 text-white bg-primary-dark">20 %</Badge>
                <Box component={"div"} className="p-4 text-center grid justify-center gap-y-1">
                   <Box component={'div'} className="w-12 m-auto h-12 bg-cover bg-center" style={{ backgroundImage: `url(${svgLink})` }}></Box>
                    <Box component={"div"} className="font-secondary font-bold text-secondary-darker">
                        {name}
                    </Box>
                    <p className="text-[12px] text-secondary-main">{productsCount} Items</p>
                </Box>
            </Card>
        </Box>
    );
};

export default CategoryCardSingle;
