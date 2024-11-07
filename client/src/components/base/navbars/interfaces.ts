export interface NavItems {
    itemsCenter: SingleItem[];
    ItemsRight: SingleItem[];
    logo: string;
    isOpen?: boolean;
    setOpen? : (isOpen: boolean) => void
}

export interface SingleItem {
    icon: React.ReactNode;
    link: string;
    name: string;
}

export interface NavItemsProps {
    NavItems: NavItems;
}


