import React from "react";
import cn from "../../../utils/class-names";
import { BreadcrumbProps } from "./interface";
import { Link } from "@tanstack/react-router";

  const Breadcrumb = ({
    items,
    separator = 'slash',
    className,
  }: BreadcrumbProps) => {
    return (
      <nav className={cn('flex items-center gap-2 text-sm', className)}>
        {items.map((item, index) => (
          <React.Fragment key={item.name}>
            <Link
              to={item.href}
              className={cn(
                'text-gray-700 hover:text-gray-900',
                !item.href && 'text-gray-500 pointer-events-none'
              )}
            >
              {item.name}
            </Link>
            {index < items.length - 1 && (
              <span className="text-gray-400">
                {separator === 'slash' ? '/' : '•'}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  };

export default Breadcrumb;