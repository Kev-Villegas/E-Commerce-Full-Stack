import Banner from "../_components/Banner";
import ProductList from "../_components/ProductList";

export default function Home() {
  return (
    <main className="mt-6 px-4">
      <Banner />
      <h1 className="mb-6 text-center text-3xl font-bold">
        Latest Fashion Collections
      </h1>
      <div className="mt-8">
        <ProductList />
      </div>
    </main>
  );
}
