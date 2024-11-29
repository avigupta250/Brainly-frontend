import { FaBrain, FaTwitter, FaYoutube } from "react-icons/fa";
import { SidebarItems } from "./SidebarItems";
import { useState } from "react";

export function SideBar() {
  const [activeFilter, setActiveFilter] = useState<string>("My Brain"); // Track the active filter

  return (
    
    
     
      <>
     
      <SidebarItems
          text="My Brain"
          icon={<FaBrain className="text-green-700" />}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
     
        <SidebarItems
          text="Twitter"
          icon={<FaTwitter className="text-blue-600" />}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <SidebarItems
          text="YouTube"
          icon={<FaYoutube className="text-red-700" />}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        
      </>
    
  );
}
  