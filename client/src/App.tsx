import Layout from "./components/Layout";
import { useState } from "react";
import Welcome from "./pages/Welcome";
import UserInfo from "./pages/UserInfo";
import DocumentUpload from "./pages/DocumentUpload";
import LoadingScreen from "./components/LoadingScreen";
import QuestionScreen from "./pages/QuestionScreen";
import DocumentEditor from "./pages/DocumentEditor";
import Feedback from "./pages/Feedback";
import ThankYou from "./pages/ThankYou";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "./lib/store";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [prevScreen, setPrevScreen] = useState("");

  const navigateTo = (screen: string) => {
    setPrevScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  // Handle special loading screens with automatic transitions
  const handleLoadingTransition = (
    currentScreen: string,
    nextScreen: string,
    loadingTime: number = 3000
  ) => {
    navigateTo(currentScreen);
    setTimeout(() => {
      navigateTo(nextScreen);
    }, loadingTime);
  };

  return (
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Layout>
          {currentScreen === "welcome" && (
            <Welcome navigateTo={() => navigateTo("user-info")} />
          )}

          {currentScreen === "user-info" && (
            <UserInfo navigateTo={() => navigateTo("document-upload")} />
          )}

          {currentScreen === "document-upload" && (
            <DocumentUpload
              navigateTo={() =>
                handleLoadingTransition("loading-1", "question-1")
              }
            />
          )}

          {currentScreen === "loading-1" && (
            <LoadingScreen
              message="Nuuron is thinking..."
              subMessage="Analyzing tender requirements"
            />
          )}

          {currentScreen === "question-1" && (
            <QuestionScreen
              questionNumber={1}
              question="What is your proposed approach for the bathymetric and geophysical survey phase?"
              defaultAnswer="Multi-beam echo sounders, side-scan sonar, and magnetometers."
              navigateTo={() => navigateTo("question-2")}
            />
          )}

          {currentScreen === "question-2" && (
            <QuestionScreen
              questionNumber={2}
              question="Have there been any updates to ABC Inspection's subsea or ROV capabilities in the past 12 months?"
              defaultAnswer="Yes, we added 2 new ROV's (Seaeye Falcon and Comanche) with high-res multibeam sonar"
              navigateTo={() => navigateTo("question-3")}
            />
          )}

          {currentScreen === "question-3" && (
            <QuestionScreen
              questionNumber={3}
              question="Are there any elements of the scope you may not deliver directly, or any potential constraints the Consortium should be aware of?"
              defaultAnswer="Vessel availability subject to confirmation (Q3 slot preferred)"
              navigateTo={() =>
                handleLoadingTransition("loading-2", "document-editor")
              }
            />
          )}

          {currentScreen === "loading-2" && (
            <LoadingScreen
              message="Creating your document..."
              subMessage="Generating technical content"
              showDocumentPreview={true}
            />
          )}

          {currentScreen === "document-editor" && (
            <DocumentEditor navigateTo={() => navigateTo("feedback")} />
          )}

          {currentScreen === "feedback" && (
            <Feedback navigateTo={() => navigateTo("thank-you")} />
          )}

          {currentScreen === "thank-you" && (
            <ThankYou navigateTo={() => navigateTo("welcome")} />
          )}
        </Layout>
      </TooltipProvider>
    </AppProvider>
  );
}

export default App;
