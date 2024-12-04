import { Box } from "@mui/material"
import ServiceCard from "../../base/service-card/ServiceCard"
import { TbCircleDashedPercentage, TbTruckDelivery } from "react-icons/tb"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { BiSupport } from "react-icons/bi"






const ServicesContainer = () => {

    return <Box className={'max-w-[1200px] p-2 flex gap-4 m-auto justify-around my-5'}>
        <ServiceCard icon={<TbTruckDelivery className="w-12 my-2 h-12 m-auto text-primary-main" />} title={"Free Shipping"} subtitle={"Free shipping on all US order or order above $200"} />
        <ServiceCard icon={<BiSupport className="w-20 h-12 my-2 m-auto text-primary-main" />} title={"24X7 Support"} subtitle={"Contact us 24 hours a day, 7 days a week"} />
        <ServiceCard icon={<TbCircleDashedPercentage className="w-20 h-12 my-2 m-auto text-primary-main" />} title={"30 Days Return"} subtitle={"Simply return it within 30 days for an exchange"} />
        <ServiceCard icon={<RiMoneyDollarCircleLine className="w-20 h-12 my-2 m-auto text-primary-main" />} title={"Payment Secure"} subtitle={"Contact us 24 hours a day, 7 days a week"} />
    </Box>
}
export default ServicesContainer