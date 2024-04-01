import {
  createProductModification,
  fetchProductModifications,
} from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("productId");
  const modifications = await fetchProductModifications(Number(productId));
  return Response.json({ modifications });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const newModification = await createProductModification(formData);

  return Response.json({ newModification });
}
