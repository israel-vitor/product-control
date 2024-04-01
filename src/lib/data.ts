"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function fetchProductPosts() {
  const productsPosts = await prisma.product_post.findMany({
    include: {
      product_modification: {
        select: {
          new_name: true,
          new_price: true,
        },
      },
    },
  });
  return productsPosts;
}

export async function fetchProduct(productId: number) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product;
}

export async function fetchProductModifications(
  productId: number | null = null
) {
  const filter = Boolean(productId)
    ? {
        product_id: Number(productId),
        applied: false,
      }
    : { applied: false };
  const modifications = await prisma.product_modification.findMany({
    where: filter,
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });
  return modifications;
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  const currentDate = new Date();

  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      created_at: currentDate,
      updated_at: currentDate,
    },
  });
  return newProduct;
}

export async function handleCreateProduct(formData: FormData) {
  await createProduct(formData);
  revalidatePath("/dashboard/");
  redirect("/dashboard/");
}

export async function createProductModification(formData: FormData) {
  const newName = formData.get("name") as string;
  const newPrice = Number(formData.get("price"));
  const productId = Number(formData.get("product_id"));

  const newModification = await prisma.product_modification.create({
    data: {
      product_id: productId,
      new_price: newPrice,
      new_name: newName,
      created_at: new Date(),
      applied: false,
    },
  });
  return newModification;
}

export async function handleCreateProductModification(formData: FormData) {
  await createProductModification(formData);
  revalidatePath("/dashboard/modification-requests");
  redirect("/dashboard/modification-requests");
}

export async function approveProductModification(formData: FormData) {
  const modificationId = Number(formData.get("modification_id"));

  const modification = await prisma.product_modification.findUnique({
    where: {
      id: modificationId,
    },
  });

  if (!modification) {
    return new Response("Modification not found");
  }

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
      published_at: new Date(),
      modification_id: modificationId,
    },
  });

  await prisma.product.update({
    data: {
      name: modification.new_name,
      price: modification.new_price,
      updated_at: new Date(),
    },
    where: {
      id: modification.product_id,
    },
  });

  await prisma.product_modification.update({
    data: {
      applied: true,
    },
    where: {
      id: modificationId,
    },
  });
  return newProductPost;
}

export async function handleApproveProductModification(formData: FormData) {
  await approveProductModification(formData);
  revalidatePath("/dashboard/modification-requests");
  redirect("/dashboard/modification-requests");
}
