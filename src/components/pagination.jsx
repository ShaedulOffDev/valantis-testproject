import PropTypes from "prop-types";

const Pagination = ({ offsetHandler, offset }) => {
  Pagination.propTypes = {
    offsetHandler: PropTypes.func.isRequired,
    offset: PropTypes.number.isRequired,
  };
  return (
    <div className="flex justify-center pt-5 pb-20 gap-2">
      <button
        onClick={() => offsetHandler(offset - 1)}
        disabled={offset < 1}
        className="w-[40px] h-[40px] flex items-center rounded border-gray-500 hover:bg-gray-500 hover:text-white transition-all justify-center border"
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      <button
        onClick={() => offsetHandler(0)}
        className={`w-[40px] h-[40px] flex items-center rounded border-gray-500 hover:bg-gray-500 hover:text-white transition-all justify-center border ${
          offset < 4 ? "hidden" : ""
        }`}
      >
        1..
      </button>
      <button
        onClick={() => offsetHandler(offset - 1)}
        className={`w-[40px] h-[40px] flex items-center rounded border-gray-500 hover:bg-gray-500 hover:text-white transition-all justify-center border ${
          offset < 1 ? "hidden" : ""
        }`}
      >
        {offset}
      </button>
      <button className="w-[40px] h-[40px] flex items-center rounded text-white transition-all justify-center bg-blue-600">
        {offset + 1}
      </button>
      <button
        onClick={() => offsetHandler(offset + 1)}
        className="w-[40px] h-[40px] flex items-center rounded border-gray-500 hover:bg-gray-500 hover:text-white transition-all justify-center border"
      >
        {offset + 2}
      </button>
      <button
        onClick={() => offsetHandler(offset + 2)}
        className="w-[40px] h-[40px] flex items-center rounded border-gray-500 hover:bg-gray-500 hover:text-white transition-all justify-center border"
      >
        {offset + 3}
      </button>
      <button
        onClick={() => offsetHandler(offset + 1)}
        className="w-[40px] h-[40px] flex items-center rounded border-gray-500 hover:bg-gray-500 hover:text-white transition-all justify-center border"
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
