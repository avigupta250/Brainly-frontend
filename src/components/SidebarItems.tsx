import { ReactElement } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allContentAtom, contentAtom } from "../Recoil/store/atoms/content";

interface SidebarItemsProps {
  text: string;
  icon: ReactElement;
  activeFilter: string; // Prop to check the currently active filter
  setActiveFilter: (filter: string) => void; // Function to update the active filter
}

export function SidebarItems({ text, icon, activeFilter, setActiveFilter }: SidebarItemsProps) {
  const setContent = useSetRecoilState(contentAtom);
  const allContent = useRecoilValue(allContentAtom);

  function filterHandler() {
   
    if(text!=="My Brain")
   { const typeItem = allContent.filter((c) => c.type === text.toLowerCase());
    setContent(typeItem);
    setActiveFilter(text); }
  else{
    setContent(allContent)
    setActiveFilter(text); 
  }
  }

  
  const isActive = activeFilter === text;

  return (
    <div
      onClick={filterHandler}
      className={`flex transition-all duration-200 mb-2 mt-2 gap-3 rounded-md cursor-pointer items-center ${
        isActive ? "bg-blue-400 text-white" : "hover:bg-slate-200 text-gray"
      }`}
    >
      <div className="p-1 text-[20px]">{icon}</div>
      <div className="px-1 hidden md:block">{text}</div>
    </div>
  );
}
