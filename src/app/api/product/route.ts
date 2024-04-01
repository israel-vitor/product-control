import { createProduct, fetchProducts } from "@/lib/data";

export async function GET() {
  const products = await fetchProducts();
  return Response.json({ products: products });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const newProduct = await createProduct(formData);
  return Response.json({ newProduct: newProduct });
}
