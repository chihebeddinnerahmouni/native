// Error handling utility for API and React Query errors
export const errorHandler = (error: unknown) => {
  console.error("Query Error:", error);

  // You can customize this based on your error handling needs
  if (error instanceof Error) {
    // Handle different types of errors
    if (error.message.includes("Network Error")) {
      console.error("Network connection issue");
      // You could show a toast notification here
    } else if (error.message.includes("401")) {
      console.error("Authentication error - user might need to login");
      // You could redirect to login screen here
    } else {
      console.error("General error:", error.message);
    }
  }
};

export default errorHandler;
