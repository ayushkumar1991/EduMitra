import * as React from "react";

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="rounded-lg border bg-white p-4 shadow">{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ children }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

export const CardContent: React.FC<CardProps> = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};
