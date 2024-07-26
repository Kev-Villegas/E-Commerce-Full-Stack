import ProductList from "../_components/ProductList";

export default function Home() {
  return (
    <main className="mt-10 px-4">
      <div className="flex items-start">
        <ProductList />
      </div>
    </main>
  );
}
