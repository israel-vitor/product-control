import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("productId");
  const modifications = Boolean(productId)
    ? await prisma.product_modification.findMany({
        where: {
          product_id: Number(productId),
        },
      })
    : await prisma.product_modification.findMany();
  return Response.json({ modifications });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const newName = formData.get("name") as string;
  const newPrice = Number(formData.get("price"));
  const productId = Number(formData.get("product_id"));

  // TODO: verificar authenticação
  const newModification = await prisma.product_modification.create({
    data: {
      product_id: productId,
      new_price: newPrice,
      new_name: newName,
      created_at: new Date().toISOString()
    },
  });

  return Response.json({ newModification });
}
