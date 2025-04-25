import { Box, Typography, Breadcrumbs, Link, Paper } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from "react";

const PathBar = ({ path }: { path: string }) => {
    const [pathSegments, setPathSegments] = useState<string[]>([]);
    const pathName = path.split('>')[1] || "";
    
    useEffect(() => {
        // Split the path by '>' and remove any empty segments
        const segments = path.split('>').filter(segment => segment.trim() !== "");
        setPathSegments(segments);
    }, [path]);

    return (
        <Paper 
            elevation={0}
            className="max-w-[1300px] m-auto rounded-b border-t-0 p-5 bg-white transition-all duration-300 mb-[20px]"
        >
            <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <Typography 
                    variant="h4" 
                    color="primary.main"
                    className="font-semibold text-2xl md:text-3xl"
                >
                    {pathName}
                </Typography>
                
                <Breadcrumbs 
                    separator={<NavigateNextIcon fontSize="small" />} 
                    aria-label="breadcrumb"
                    className="text-secondary-light"
                >
                    {pathSegments.map((segment, index) => {
                        const isLast = index === pathSegments.length - 1;
                        
                        return isLast ? (
                            <Typography 
                                key={index} 
                                color="text.primary"
                                className="font-medium"
                            >
                                {segment}
                            </Typography>
                        ) : (
                            <Link
                                key={index}
                                color="inherit"
                                href="#"
                                className="hover:text-primary-main transition-colors duration-200"
                                underline="hover"
                            >
                                {segment}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </Box>
        </Paper>
    );
}

export default PathBar