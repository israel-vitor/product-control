import { fetchProductPosts } from "@/lib/data";

export async function GET() {
  const productPosts = await fetchProductPosts();
  return Response.json({ products: productPosts });
}
