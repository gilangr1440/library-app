import Layout from "../../components/Layout";
import bookicon from "../../assets/book-icon.png";
import Cards from "../../components/Cards";
import bookcover from "../../assets/software-engineer-cover.jpg";
import Slider from "../../components/Slider";

const Home = () => {
  return (
    <Layout>
      <div>
        <div className="h-20"></div>
        <div className="grid grid-cols-2 items-center justify-items-center h-96">
          <div>
            <h1 className="text-5xl font-bold mb-2">Welcome to BookQuest</h1>
            <h2 className="text-xl text-gray-500 mb-3">Discover and borrow thousands of books at your fingertips.</h2>
            <button className="bg-black hover:bg-gray-800 transition duration-300 text-sm text-white font-medium p-3 rounded-md">Get Started</button>
          </div>
          <div>
            <img src={bookicon} alt="book" width={200} />
          </div>
        </div>
        <div className="flex justify-between px-10 mb-10">
          <h3 className="font-semibold text-xl">New Release Books</h3>
          <button className="text-sm p-2">show all</button>
        </div>
        <div className="grid grid-cols-4 justify-items-center mb-10">
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
        </div>
        <div className="h-96 w-[95%] mx-auto mb-10">
          <Slider />
        </div>
        <div className="flex justify-between px-10 mb-10">
          <h3 className="font-semibold text-xl">Others</h3>
          <button className="text-sm p-2">show all</button>
        </div>
        <div className="grid grid-cols-4 justify-items-center mb-10">
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
