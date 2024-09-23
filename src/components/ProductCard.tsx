interface ProductCardProps {
  id: number,
  title: string,
  category: string,
  price: number,
  image: string
  viewDetail: VoidFunction
}

const ProductCard = (props: ProductCardProps) => {
  return (

    <div className="flex flex-col justify-center items-center rounded-xl w-full h-auto md:w-72 md:min-h-max bg-white shadow-md gap-4 p-6">
  
      {/* Image */}
      <div className="flex flex-col items-center">
        <img src={props.image} alt={props.title} className="w-32 h-36"/>
      </div>

      {/* Title */}
      <div className="flex flex-col text-center justify-center text-lg font-bold">
        {props.title}
      </div>

      {/* Category */}
      <div className="flex flex-col justify-center text-lg font-semibold">
        {props.category}
      </div>

      {/* Price */}
      <div className="flex flex-col justify-center text-lg font-semibold">
        $ {props.price}
      </div>

      {/* Button */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={props.viewDetail}
          className="rounded-xl px-3 py-2 font-semibold text-white bg-orange-600 hover:bg-orange-700"
        >
          View Detail
        </button>
      </div>

    </div>
  );
};

export default ProductCard;