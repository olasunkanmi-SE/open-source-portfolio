import { Outlet } from "react-router";
import { NavBar } from "~/components/NavBar";
import Sidebar from "~/components/SideBar";

export default function CodeBuddy() {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
