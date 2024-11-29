import { ApiResponse } from "../types/ApiResponse";

// R = T means output type (R) is the same as API type (T) if not specified
export async function apiRequest<T, R = T>(
  requestFn: () => Promise<Response>,
  transform?: (data: T) => R,
): Promise<ApiResponse<R>> {
  try {
    const response = await requestFn();
    const data = await response.json();

    return response.ok
      ? { success: true, data: transform ? transform(data) : data }
      : {
          success: false,
          error: { message: "Request failed", fields: data.errors },
        };
  } catch {
    return {
      success: false,
      error: { message: "Network or server error" },
    };
  }
}
