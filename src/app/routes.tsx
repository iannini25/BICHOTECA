import { createBrowserRouter } from "react-router";
import { Splash } from "./pages/Splash";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { BiomeView } from "./pages/Biome";
import { AnimalView } from "./pages/Animal";
import { MobileLayout } from "./components/MobileLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileLayout,
    children: [
      { index: true, Component: Splash },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "home", Component: Home },
      { path: "biome/:id", Component: BiomeView },
      { path: "biome/:biomeId/animal/:animalId", Component: AnimalView },
    ],
  },
]);
