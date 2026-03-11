/**
 * API module barrel export.
 *
 * Consumers import from "@/lib/api" to get both the typed client and schema types.
 */

export { api, setAuthToken, clearAuthToken, getAuthToken } from "./client";

export type {
    AuthRequest,
    LoginResponse,
    UploadImageResponse,
    BlogPost,
    BlogPostList,
    CreateBlogPostRequest,
    UpdateBlogPostRequest,
    TagList,
    MessageResponse,
} from "./types";
