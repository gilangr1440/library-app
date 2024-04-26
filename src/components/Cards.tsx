import { FC } from "react";
import { CardsProps } from "../utils/types/component";

const Cards: FC<CardsProps> = ({ img, title, author }) => {
  return (
    <div className="w-56 mb-5">
      <div className="w-full h-72 shadow-lg mb-4">
        <img src={img} className="w-full h-full object-cover rounded-sm" alt="cover" />
      </div>
      <h1 className="text-md font-bold text-center mb-3">{title}</h1>
      <h2 className="text-sm text-gray-500 text-center">{author}</h2>
    </div>
  );
};

export default Cards;
