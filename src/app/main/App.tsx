import { RouterProvider } from "react-router-dom";
import { router } from "../routers/router/ui/router";
import '@/shared/styles/utils/_global.scss';

function App() {
  
  return <RouterProvider router={router} />;
}

export default App
