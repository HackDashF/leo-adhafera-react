export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    fields?: Record<string, string[]>;
  };
  success: boolean;
}
