import Layout from "../../components/Layout";
import bookcover from "../../assets/software-engineer-cover.jpg";

const Detail = () => {
  return (
    <Layout>
      <div className="py-32 flex flex-wrap mx-16 gap-10 items-center">
        <div className="w-[350px] h-[530px]">
          <img src={bookcover} className="w-full h-full object-cover" alt="cover-book" />
        </div>
        <div className="w-[830px]">
          <h1 className="text-2xl font-bold mb-3">Modern Software Engineering</h1>
          <h3 className="text-sm text-gray-500 mb-3">by David Farley</h3>
          <span className="bg-black text-white text-xs rounded-full p-1 mb-3">engineering</span>
          <hr className="my-8" />
          <p className="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti quia quidem dolorem ea consectetur sunt! Voluptatem, voluptates odio quo nemo unde dolore iusto eveniet excepturi aperiam minima corporis magnam quasi! Molestiae
            beatae a eum nulla cum? Magnam autem ipsam, est obcaecati expedita nulla facilis numquam qui, iste dolorem dolorum laudantium?
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
