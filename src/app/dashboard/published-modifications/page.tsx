import { fetchProductPosts } from "@/lib/data";
import clsx from "clsx";

export default async function Page() {
  const productPosts = await fetchProductPosts();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Published Modifications</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {productPosts.map((post, index) => {
            return (
              <div
                key={post.id}
                className={clsx(
                  "flex flex-row items-center justify-between gap-5 py-4",
                  {
                    "border-t": index !== 0,
                  }
                )}
              >
                <div className="grid grid-cols-3 gap-4 items-center justify-between w-full">
                  <div className="min-w-0">
                    <p className="hidden text-sm text-gray-500 sm:block">
                      New name
                    </p>
                    <p className="truncate text-sm font-semibold md:text-base whitespace-pre-wrap break-words">
                      {post.product_modification.new_name}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="hidden text-sm text-gray-500 sm:block">
                      New Price
                    </p>
                    <p className="truncate text-sm font-semibold md:text-base whitespace-pre-wrap break-words">
                      ${post.product_modification.new_price}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="hidden text-sm text-gray-500 sm:block">
                      Created at
                    </p>
                    <p className="truncate text-sm font-semibold md:text-base whitespace-pre-wrap break-words">
                      {post.published_at?.toLocaleString() ?? ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
