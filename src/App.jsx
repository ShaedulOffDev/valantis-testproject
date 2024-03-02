import { useEffect, useState } from "react";
import { getIds, getProducts } from "./service/api.service";
import ProductCard from "./components/productCard";
import Pagination from "./components/pagination";
import Filter from "./components/filter";
import { motion } from "framer-motion";

const App = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [sortedIds, setSortedIds] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchKeys, setSearchKeys] = useState({ ctg: "brand", key: "" });
  useEffect(() => {
    setLoading(true);
    if (sortedIds == null) {
      getIds(offset)
        .then(async (res) => {
          const response = await getProducts(res.result);
          const uniqueIds = [];
          const uniqueItems = [];
          response.result.filter((p) => {
            if (uniqueIds.indexOf(p.id) == -1) {
              uniqueItems.push(p);
              uniqueIds.push(p.id);
            }
          });
          setProducts(uniqueItems);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(error.message);
        });
    } else {
      if (sortedIds.length > 50) {
        getProducts(sortedIds.slice(offset * 50, offset * 50 + 50))
          .then((res) => {
            const uniqueIds = [];
            const uniqueItems = [];
            res.result.filter((p) => {
              if (uniqueIds.indexOf(p.id) == -1) {
                uniqueItems.push(p);
                uniqueIds.push(p.id);
              }
            });
            setProducts(uniqueItems);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            setError(error.message);
          });
      } else {
        getProducts(sortedIds)
          .then((res) => {
            const uniqueIds = [];
            const uniqueItems = [];
            res.result.filter((p) => {
              if (uniqueIds.indexOf(p.id) == -1) {
                uniqueItems.push(p);
                uniqueIds.push(p.id);
              }
            });
            setProducts(uniqueItems);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            setError(error.message);
          });
      }
    }
  }, [offset, sortedIds]);

  const offsetHandler = (n) => {
    setOffset(n);
    window.scrollTo(0, 0);
    setProducts(null);
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="text-center text-3xl pt-10 border-t-4 border-yellow-500">
        <i className="fa fa-circle-notch fa-spin"></i>
      </div>
    );
  }
  if (error) {
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
  }
  const searchKeysHandler = (ctg) => {
    switch (ctg) {
      case "brand":
        return "бренда";
      case "product":
        return "имени";
      case "price":
        return "цены";
      default:
        return "бренда";
    }
  };
  return (
    <div className="border-t-4 border-blue-500 pt-5 overflow-x-hidden">
      <div className="py-5 container mx-auto px-2">
        <div className="flex justify-between max-[450px]:flex-col items-center mb-10">
          <motion.h2
            viewport={{ once: true }}
            initial={{ x: -100, opacity: 0.1 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-5xl font-bold max-[450px]:mb-5"
          >
            Продукты
          </motion.h2>
          <motion.button
            viewport={{ once: true }}
            initial={{ x: 100, opacity: 0.1 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-white rounded-md bg-blue-600 px-5 py-2"
            onClick={() => setIsFilterOpen(true)}
          >
            Фильтр
            <i className="fa fa-filter ms-2"></i>
          </motion.button>
        </div>
        {searchKeys.key != "" && (
          <p className="text-gray-500 mb-4">
            Поиск по: <strong>{searchKeysHandler(searchKeys.ctg)}</strong> <br /> Ключевое слово:{" "}
            <strong>{searchKeys.key}</strong>
          </p>
        )}
        <div className="h-full w-full grid grid-cols-4 gap-3 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1">
          {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        {products?.length == 0 && (
          <div className="text-center py-10 text-5xl text-gray-400">Ничего не найдено</div>
        )}
      </div>
      {products?.length >= (sortedIds == null ? 10 : 50) && (
        <Pagination offsetHandler={offsetHandler} offset={offset} />
      )}
      <Filter
        setSortedIds={setSortedIds}
        setLoading={setLoading}
        setProducts={setProducts}
        setOffset={setOffset}
        setError={setError}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        setSearchKeys={setSearchKeys}
      />
    </div>
  );
};

export default App;
