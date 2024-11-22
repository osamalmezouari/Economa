import { Box, Typography } from "@mui/material"
import { SectionTitleProps } from "./interfaces"

const LandingTitle = ({ title, subTitle }: SectionTitleProps) => {
    const words = title.split(' '); 
    const lastWord = words.filter(word => word !== '').pop() || '';
    const updatedTitle = title.slice(0, title.lastIndexOf(lastWord)).trim();
    return <Box maxWidth={'1200px'} className="p-2" margin={'30px auto'}>
        <Typography variant="h3" className="text-secondary-main capitalize">
            {updatedTitle}
            <span className="text-primary-main "> {lastWord}</span>
        </Typography>
        <p className="font-secondary font-normal tracking-wider text-secondary-light">{subTitle}</p>
    </Box>
}

export default LandingTitle