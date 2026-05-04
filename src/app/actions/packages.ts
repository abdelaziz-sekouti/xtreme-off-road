"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function createPackage(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Non autorisé" };

  const id = uuidv4();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const duration = formData.get("duration") as string;
  const imageUrl = formData.get("imageUrl") as string;

  try {
    await pool.query(
      `INSERT INTO packages (id, title, description, price, duration, imageUrl) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, title, description, price, duration, imageUrl]
    );

    revalidatePath("/admin/packages");
    revalidatePath("/packages");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create package:", error);
    return { error: "Erreur lors de la création" };
  }
}

export async function deletePackage(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Non autorisé" };

  try {
    await pool.query(`DELETE FROM packages WHERE id = ?`, [id]);
    revalidatePath("/admin/packages");
    revalidatePath("/packages");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete package:", error);
    return { error: "Erreur lors de la suppression" };
  }
}
