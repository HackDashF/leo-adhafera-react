// export interface ApiResponse<T> {
//   data?: T;
//   error?: {
//     message: string;
//     fields?: Record<string, string[]>;
//   };
//   success: boolean;
// }
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse<T>;

export interface ApiSuccessResponse<T> {
  data: T;
  success: true;
}

export interface ApiErrorResponse<T> {
  error: {
    message: string;
    fields?: Record<string, string[]>;
  };
  success: false;
}
