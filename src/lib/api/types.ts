/**
 * Re-exported schema types from the OpenAPI spec.
 *
 * Import these from "@/lib/api" for convenient use in components and hooks.
 * Generated origin: openapi-types.ts → components["schemas"]
 */

import type { components } from "@/contracts/openapi-types";

// Auth
export type AuthRequest = components["schemas"]["AuthRequest"];
export type LoginResponse = components["schemas"]["LoginResponse"];

// Upload
export type UploadImageResponse = components["schemas"]["UploadImageResponse"];

// Blog
export type BlogPost = components["schemas"]["BlogPost"];
export type BlogPostList = components["schemas"]["BlogPostList"];
export type CreateBlogPostRequest = components["schemas"]["CreateBlogPostRequest"];
export type UpdateBlogPostRequest = components["schemas"]["UpdateBlogPostRequest"];
export type TagList = components["schemas"]["TagList"];

// Shared
export type MessageResponse = components["schemas"]["MessageResponse"];
