import { approveProductModification } from "@/lib/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const newProductPost = await approveProductModification(formData);

  return Response.json({ newProductPost });
}
