import prisma from "@/lib/prisma";

export async function GET() {
  const productPosts = await prisma.product_post.findMany();
  return Response.json({ products: productPosts });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  // TODO: verificar authenticação
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
    },
  });

  return Response.json({ newProduct: newProduct });
}
