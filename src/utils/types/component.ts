import React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

export interface CardsProps {
  id?: number;
  img?: string;
  title?: string;
  author?: string;
}
