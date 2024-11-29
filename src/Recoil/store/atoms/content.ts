import {atom} from "recoil"

interface ContentItem {
    type: "twitter" | "youtube"
    title: string;
    link:string 
  }
  

 export const contentAtom = atom<ContentItem[]>({
    key: "contentAtom",
    default: [],
  });
  



export const allContentAtom = atom<ContentItem[]>({
  key: "allContentAtom",
  default: [],
});
