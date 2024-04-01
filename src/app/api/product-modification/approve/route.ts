import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  // TODO: verificar authenticação
  const formData = await request.formData();
  const modificationId = Number(formData.get("modification_id"));

  const modification = await prisma.product_modification.findUnique({
    where: {
      id: modificationId,
    },
  });

  const currentProductPost = await prisma.product_post.findMany({
    where: {
      modification_id: modificationId,
    },
  });

  if (currentProductPost.length > 0) {
    return new Response("Product modification was already published");
  }

  const newProductPost = await prisma.product_post.create({
    data: {
      product_id: modification.product_id,
      published_at: new Date().toISOString(),
      modification_id: modificationId,
    },
  });

  await prisma.product.update({
    data: {
      name: modification.new_name,
      price: modification.new_price,
      updated_at: new Date().toISOString(),
    },
    where: {
      id: modification.product_id,
    },
  });

  return Response.json({ newProductPost });
}
