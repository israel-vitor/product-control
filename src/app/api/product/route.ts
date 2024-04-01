import prisma from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany();
  return Response.json({ products: products });
}

export async function POST(request: Request) {
  // TODO: verificar authenticação e tipo de user
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  const currentDate = new Date().toISOString();

  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      created_at: currentDate,
      updated_at: currentDate,
    },
  });

  return Response.json({ newProduct: newProduct });
}
