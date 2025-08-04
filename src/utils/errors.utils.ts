import { showErrorAlert } from "../components/ui/alerts/alerts.component";

// Error handling utility for API and React Query errors
export const errorHandler = (error: unknown) => {
  console.error("Query Error:", error);

  if (error instanceof Error) {
    if (error.message.includes("Network Error")) {
      showErrorAlert("Network Error", "Please check your internet connection.");
    } else if (error.message.includes("401")) {
      showErrorAlert("Authentication Error", "You need to log in.");
    } else {
      showErrorAlert("General Error", error.message);
    }
  }
};

export default errorHandler;
