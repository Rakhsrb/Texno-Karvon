import {
  Users,
  GalleryHorizontalEnd,
  PanelLeftOpen,
  PanelLeftClose,
  CodeXml,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

export function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const items = [
    {
      title: "Portfolios",
      url: "/",
      icon: GalleryHorizontalEnd,
    },
    {
      title: "Admins",
      url: "/admins",
      icon: Users,
    },
    {
      title: "Team",
      url: "/team",
      icon: CodeXml,
    },
  ];

  return (
    <aside
      style={{ transition: "all ease-in-out .3s" }}
      className={`bg-[#202020] text-white h-screen p-4 ${
        isSidebarOpen ? "w-[300px]" : "w-[60px]"
      }`}
    >
      <ul
        className={`flex flex-col gap-5 ${
          !isSidebarOpen ? "items-center" : ""
        }`}
      >
        {isSidebarOpen ? (
          <PanelLeftClose
            onClick={() =>
              setIsSidebarOpen((prevData) => (prevData ? false : true))
            }
          />
        ) : (
          <PanelLeftOpen
            onClick={() =>
              setIsSidebarOpen((prevData) => (prevData ? false : true))
            }
          />
        )}
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              className={`flex items-center gap-2 ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              {<item.icon size={18} />}
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
