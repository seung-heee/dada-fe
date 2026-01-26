import RootLayout from "@/layout/RootLayout.tsx";
import OnBoarding from "@/pages/OnBoarding.tsx";
import {createBrowserRouter} from "react-router";
import MeetingNamePage from "@/pages/admin/MeetingNamePage.tsx";
import CalendarPage from "@/pages/admin/CalendarPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {index: true, Component: OnBoarding},
      {path: "meetingName", Component: MeetingNamePage},
      {path: "calendar/:meetingName", Component: CalendarPage},
    ]
  },
])