import { fetchProducts } from "@/lib/data";
import clsx from "clsx";
import { lusitana } from "./fonts";

export default async function Home() {
  const products = await fetchProducts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full flex-col md:col-span-4">
        <h2 className="mb-4 text-xl md:text-2xl">Products</h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          <div className="bg-white px-6">
            {products.map((product, index) => {
              return (
                <div
                  key={product.id}
                  className={clsx(
                    "flex flex-row items-center justify-between py-4",
                    {
                      "border-t": index !== 0,
                    }
                  )}
                >
                  <div className="flex items-center">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        {product.name}
                      </p>
                      {/* <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p> */}
                    </div>
                  </div>
                  <p
                    className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                  >
                    ${product.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
