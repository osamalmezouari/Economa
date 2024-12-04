import { Box } from "@mui/material"
import { ServiceCardProps } from "./interface"

const ServiceCard = ({
    icon,
    title,
    subtitle,
}: ServiceCardProps) => {

    return <Box className="w-[300px]  border-gray-200 border-2 rounded text-center">
        {icon}
        <p className="p-2 font-bold font-xl text-secondary-main">
            {title}
        </p>
        <p className="px-4 py-1 text-secondary-main font-light">{subtitle}</p>
    </Box>
}
export default ServiceCard