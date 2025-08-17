/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as documents from "../documents.js";
import type * as http from "../http.js";
import type * as router from "../router.js";
import type * as sampleData from "../sampleData.js";
import type * as sampleForms from "../sampleForms.js";
import type * as services from "../services.js";
import type * as taxTools from "../taxTools.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  categories: typeof categories;
  documents: typeof documents;
  http: typeof http;
  router: typeof router;
  sampleData: typeof sampleData;
  sampleForms: typeof sampleForms;
  services: typeof services;
  taxTools: typeof taxTools;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
