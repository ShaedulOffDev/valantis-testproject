import PropTypes from 'prop-types';
import {motion} from 'framer-motion'

const ProductCard = ({ product }) => {
  ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      brand: PropTypes.string,
      product: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  };
  return (
    <motion.div initial={{y: 150, opacity: .1}} whileInView={{y: 0, opacity: 1}} viewport={{once: true}} className="w-full border bg-white rounded-lg shadow p-5 pb-[60px] relative">
        {product.brand && <p className='text-[18px] rounded-[10px] bg-slate-300 inline-block px-2 py-1 m-0 mb-2'>{product.brand}</p>}
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 cursor-pointer">{product.product}</h5>
        <p className='text-[13px] text-gray-500 mb-1'>ID: {product.id}</p>
        <span className="text-3xl max-[768px]:text-2xl font-bold text-gray-900 absolute bottom-[0] ps-5 pb-5 start-[0]">
          <i className="fa fa-rub text-[25px] max-[768px]:text-[20px] me-1"></i>
          {product.price}
        </span>
    </motion.div>
  );
};

export default ProductCard;
