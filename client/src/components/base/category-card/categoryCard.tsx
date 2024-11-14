import { Badge, Box, colors, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { PiPopcornDuotone } from "react-icons/pi";

const CategoryCardSingle = () => {
    const calors : string[] =  ['#e2fde2' ,'#fee9e8','#fdf4ea','#F9DEF2','fdf5eb']
    const randomColor  = calors[Math.floor(Math.random() * calors.length - 1)];

    return (
        <Box component={'div'}  className={`p-3 rounded bg-[${randomColor}]`}>
            <Card
                className="w-[180px] h-[160px]  bg-secondary-darker  "
                style={{
                    transition: "box-shadow 0.5s ease-in-out, outline 0.5s ease-in-out",
                }}
            >
                <Badge className="rounded px-3 text-white bg-primary-dark">20 %</Badge>
                <Box component={"div"} className="p-4 text-center grid justify-center gap-y-1">
                    <Box component={'div'} className="" style={{backgroundImage : `url()`}}></Box>
                    <Box component={"div"} className="font-secondary font-bold text-secondary-darker">
                        Fast Food
                    </Box>
                    <p className="text-[12px] text-secondary-main">256 Items</p>
                </Box>
            </Card>
        </Box>
    );
};

export default CategoryCardSingle;
