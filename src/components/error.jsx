import PropTypes from 'prop-types'

const Error = ({error}) => {
  Error.propTypes = {
    error: PropTypes.string.isRequired
  }
  return (
    <div className="text-center text-3xl pt-10 border-t-4 border-red-500">
      <p>{error}</p>
      <p className="text-2xl">Пожалуйста, повторите попытку позже</p>
      <button
        onClick={() => location.reload()}
        className="mt-4 border rounded-md text-[18px] border-red-500  px-5 hover:bg-red-500 hover:text-white transition-all py-[2px] text-red-500"
      >
        Обновить
      </button>
    </div>
  );
};

export default Error;
