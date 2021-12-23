import React from 'react';
import { PageTitle } from './PageTitle';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Page = ({ children, title }: Props) => (
  <div>
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);
