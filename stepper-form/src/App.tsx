import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import StepperForEmployee from "./components/Stepper/StepperForEmployee";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "addEmployee",
          element: <StepperForEmployee />,
        },
        {
          path: "editEmployee/:id",
          element: <StepperForEmployee />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
