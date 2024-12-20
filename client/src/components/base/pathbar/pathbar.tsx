import { Box, Typography } from "@mui/material";

const PathBar = ({ path }: { path: string }) => {
    const pathName = path.split('>')[1]

    return (
        <Box className="flex max-w-[1200px] m-auto justify-between items-center rounded border-[1px]  p-4  rounded-b-xl" component={'div'}  >
            <Typography variant="h4" color="primary.main">
                {pathName}
            </Typography>
            <Typography variant="body1" color="seconadry.lighter">
                {path}
            </Typography>
        </Box>
    );
}
export default PathBar