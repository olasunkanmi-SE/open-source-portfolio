import { Outlet } from "react-router";

export default function CodeBuddy() {
  return (
    <div>
      <p>I am default IntellisearchOutlet</p>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
