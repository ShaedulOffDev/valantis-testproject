import { motion } from "framer-motion";
import { getField, getSortedIds } from "../service/api.service";
import PropTypes from 'prop-types';
import { useState } from "react";

const Filter = ({
  setSortedIds,
  setLoading,
  setProducts,
  setOffset,
  setError,
  isFilterOpen,
  setIsFilterOpen,
  setSearchKeys,
}) => {
  Filter.propTypes = {
    setSearchKeys: PropTypes.func.isRequired,
    isFilterOpen: PropTypes.bool.isRequired,
    setIsFilterOpen: PropTypes.func.isRequired,
    setSortedIds: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setProducts: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  };
  const [searchFor, setSearchFor] = useState("brand");
  const [searchVal, setSearchVal] = useState("");
  const formSubmit = async (e) => {
    e.preventDefault();
    if (searchVal != "") {
      setLoading(true);
      await getField(searchFor)
        .then((res) => {
          let k = searchVal;
          if (searchFor == "brand") {
            const result = [...new Set(res.result)];
            const fields = result.filter((f) => f !== null);
            const key = new RegExp(searchVal, "gi");
            const validKey = fields.filter((f) => f.match(key));
            k = validKey.length > 0 ? validKey[0] : searchVal;
          }
          setSearchKeys({ctg: searchFor, key: k})
          getSortedIds(searchFor, k)
            .then(async (res) => {
              setSortedIds([...new Set(res.result)]);
              setProducts(null);
              setOffset(0);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
              setError(error.message);
            });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(error.message);
        });
    } else {
      setSortedIds(null);
    }
    setIsFilterOpen(false);
  };
  const clearForm = () => {
    setIsFilterOpen(false);
    setLoading(false);
    setOffset(0);
    setSortedIds(null);
    setSearchFor("brand");
    setSearchVal("");
  };
  return (
    <div
      className={`${
        isFilterOpen ? "block" : "hidden"
      } fixed w-full h-full top-0 start-0 z-[10] overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={isFilterOpen ? { opacity: 1 } : { opacity: 0 }}
        onClick={() => setIsFilterOpen(false)}
        className="absolute w-full h-full top-0 start-0 bg-black bg-opacity-50"
      ></motion.div>
      <motion.div
        className="absolute h-full w-[350px] max-[378px]:w-full end-0 top-0 bg-white"
        initial={{ x: 200 }}
        animate={isFilterOpen ? { x: 0 } : { x: 200 }}
      >
        <div className="ps-[30px] pt-[20px] pb-3 border-b border-gray-500">
          <button onClick={() => setIsFilterOpen(false)} type="button">
            <i className="fa fa-times text-3xl text-gray-700"></i>
          </button>
        </div>
        <form className="w-full pt-7 px-[30px]" onSubmit={formSubmit}>
          <label className="mb-1 block">
            Искать -
            <select
              value={searchFor}
              onChange={(e) => {
                setSearchFor(e.target.value);
                setSearchVal("");
              }}
              className="border-gray-400 px-3 outline-none py-1 rounded w-full border"
            >
              <option value="brand">Бранд</option>
              <option value="product">Названия</option>
              <option value="price">Цена</option>
            </select>
          </label>
          <label className="mb-1 block">
            Введите {searchFor == "brand" && "бранд"}
            {searchFor == "product" && "названия"}
            {searchFor == "price" && "цена"}
            <input
              className="border-gray-400 px-3 outline-none py-1 rounded w-full border"
              type={searchFor == "price" ? "number" : "text"}
              onChange={(e) => setSearchVal(e.target.value)}
              value={searchVal}
            />
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearForm}
              className="border-blue-500 hover:bg-blue-500 transition-all hover:text-white me-2 border px-5 py-1 rounded text-blue-500 mt-3"
            >
              Очистить
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-5 py-1 rounded hover:bg-blue-600 transition-all text-white mt-3"
            >
              Фильтр
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Filter;
