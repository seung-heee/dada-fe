import RootLayout from "@/layout/RootLayout.tsx";
import OnBoarding from "@/pages/OnBoarding.tsx";
import {createBrowserRouter} from "react-router";
import CreateRoomPage from "@/pages/CreateRoomPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {index: true, Component: OnBoarding},
      {path: "create-room", Component: CreateRoomPage},
    ]
  },
])