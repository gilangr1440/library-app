import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Books } from "../../utils/apis/books/types";
import { searchBook } from "../../utils/apis/books/api";
import Layout from "../../components/Layout";
import Cards from "../../components/Cards";

const Search = () => {
  const { keyword } = useParams();
  const [searchDatas, setSearchDatas] = useState<Books[]>([]);

  useEffect(() => {
    searchResult(keyword);
  }, [keyword]);

  const searchResult = async (keyword: string | undefined) => {
    if (keyword !== undefined) {
      const searchKey = keyword;
      try {
        const result = await searchBook(searchKey);
        setSearchDatas(result.payload.datas);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  return (
    <Layout>
      <div className="dark:bg-gray-900 py-32">
        {searchDatas.length !== 0 ? <h1 className="dark:text-white text-3xl ms-5">Search result: {keyword}</h1> : <h1 className="dark:text-white text-3xl ms-5">No result</h1>}
        <div className="grid grid-cols-5 justify-items-center mt-10">
          {searchDatas.length !== 0 ? searchDatas.map((data: Books, index: number) => <Cards key={index} id={data.id} img={data.cover_image} title={data.title} author={data.author} />) : <div></div>}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
