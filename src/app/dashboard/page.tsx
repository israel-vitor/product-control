import { fetchProducts } from "@/lib/data";
import clsx from "clsx";
import { lusitana } from "../fonts";
import { Button } from "@/components/common/button";
import Link from "next/link";

export default async function Page() {
  const products = await fetchProducts();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Products</h2>

      <Link href="/dashboard/create-product/">
        <Button>Create Product</Button>
      </Link>

      <div className="flex grow flex-col justify-between rounded-xl mt-5 bg-gray-50 p-4">
        <div className="bg-white px-6">
          {products.map((product, index) => {
            return (
              <div
                key={product.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4 gap-6",
                  {
                    "border-t": index !== 0,
                  }
                )}
              >
                <div className="grid grid-cols-2 gap-4 items-center justify-between w-full">
                  <div className="min-w-0">
                    <p className="hidden text-sm text-gray-500 sm:block">
                      Product name
                    </p>
                    <p className="truncate text-sm font-semibold md:text-base whitespace-pre-wrap break-words">
                      {product.name}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="hidden text-sm text-gray-500 sm:block">
                      Price
                    </p>
                    <p className="truncate text-sm font-semibold md:text-base whitespace-pre-wrap break-words">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <Link href={`/dashboard/edit-product/${product.id}`}>
                  <Button>Edit</Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
