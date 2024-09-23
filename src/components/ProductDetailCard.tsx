import React from "react";
import capitalizeLetter from "../utilities/capitalizeLetter";

interface ProductDetailProps {
  title: string,
  category: string,
  description: string,
  price: number,
  image: string,
  addCart: VoidFunction,
}

const ProductDetailCard = (props: ProductDetailProps) => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row md:gap-4 md:justify-start md:px-10 md:py-20 justify-center items-center rounded-xl w-full h-auto md:h-auto bg-white shadow-md gap-10 p-6">
        <div className="flex flex-col md:w-1/4">
          <img 
            className="w-44 h-52" 
            src={props.image}
            alt={props.title} 
          />
        </div>
        <div className="flex flex-col gap-4 md:w-3/4 items-center md:items-start">
          <h1 className="text-2xl font-bold md:text-justify text-center">
            <span className="text-gray-400 font-medium">Title:</span> {props.title}
          </h1>
          <p className="text-xl font-semibold md:text-justify text-center">
            <span className="text-gray-400 font-medium">Category:</span> {capitalizeLetter(props.category)}
          </p>
          <p className="text-lg font-normal md:text-justify text-center">
            <span className="text-gray-400 font-medium">Description:</span><br />
            {props.description}
          </p>
          <p className="text-xl font-semibold">
            <span className="text-gray-400 font-medium">Price:</span><br />
            $ {props.price}
          </p>
          <button
            type="button"
            onClick={props.addCart}
            className="max-w-fit rounded-xl px-3 py-2 font-semibold text-white bg-orange-600 hover:bg-orange-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetailCard;