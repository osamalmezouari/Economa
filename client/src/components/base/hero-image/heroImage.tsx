import { KeyboardDoubleArrowRight } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { Image_bg_hero } from "../../../mock/constants"
const HeroImage = () => {
    return <>
        <Box className={'rounded bg-cover mt-10 bg-center max-w-[1400px] h-[600px] m-auto grid grid-cols-2 grid-rows-3 p-4 sm:p-24'} component={'div'} style={{ backgroundImage: `url(${Image_bg_hero.src})` }} >
            <Box className=" row-start-2 md:col-span-1 col-span-2 ">
                <Typography variant="h4" className="-tracking-tighter font-secondary" color="primary" >Starting at {`10.00`}$</Typography>
                <Typography variant="h1" className="-tracking-tighter text-secondary-main" >Explore fresh & juicy fruits</Typography>
                <Button variant="contained" color="secondary" endIcon={<KeyboardDoubleArrowRight />} className="text-white top-8 h-12  hover:bg-primary-main">Shop Now</Button>
            </Box>
        </Box>
    </>
}

export default HeroImage