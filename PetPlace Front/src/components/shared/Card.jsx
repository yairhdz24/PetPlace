import React from "react";
import { RiShoppingCart2Line, RiShoppingCartLine } from "react-icons/ri";

const Card = (props) => {
  const { img, description, price, id, addToCart } = props;

  const handleAddToCart = () => {
    const product = {
      id,
      img,
      description,
      price: parseFloat(price),
      quantity: 1,
    };

    addToCart(product);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        <img className="p-8 rounded-t-lg object-cover h-64 w-full" src={img} alt={description} />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {description}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-6 h-6 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
              5.0
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 ">
            ${price}
          </span>
          <button
            onClick={handleAddToCart}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 text-center "
          >
            <RiShoppingCart2Line className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
