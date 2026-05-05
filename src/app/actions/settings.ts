"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function updateSettings(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const instagram = formData.get("instagram") as string;
  const primaryColor = formData.get("primaryColor") as string;
  const secondaryColor = formData.get("secondaryColor") as string;
  const accentColor = formData.get("accentColor") as string;
  const typographyFamily = formData.get("typographyFamily") as string;

  try {
    await pool.query(
      `UPDATE site_settings
       SET title = ?, description = ?, address = ?, phone = ?, whatsapp = ?, instagram = ?,
           primaryColor = ?, secondaryColor = ?, accentColor = ?, typographyFamily = ?
       WHERE id = '1'`,
      [title, description, address, phone, whatsapp, instagram, primaryColor, secondaryColor, accentColor, typographyFamily]
    );

    revalidatePath("/", "layout"); // Revalidate entire layout to apply new theme
  } catch (error: any) {
    console.error("Failed to update settings:", error);
  }
}
