export type BreadcrumbItem = {
  name: string;
  href?: string;
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: 'slash' | 'dot';
  className?: string;
}
