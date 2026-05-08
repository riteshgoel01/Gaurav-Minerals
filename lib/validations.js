import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .default(""),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .trim(),
})

export const quoteSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .default(""),
  product: z
    .string()
    .min(1, "Please select a product")
    .max(200, "Product name too long"),
  quantity: z
    .string()
    .max(100, "Quantity description too long")
    .optional()
    .default(""),
  message: z
    .string()
    .max(2000, "Message must be less than 2000 characters")
    .optional()
    .default(""),
})
