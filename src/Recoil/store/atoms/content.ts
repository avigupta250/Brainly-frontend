import {atom} from "recoil"
// Define the type of the content items
interface ContentItem {
    type: "twitter" | "youtube"
    title: string;
    link:string // Add other properties as needed
  }
  
  // Set the type of contentAtom
 export const contentAtom = atom<ContentItem[]>({
    key: "contentAtom",
    default: [],
  });
  



export const allContentAtom = atom<ContentItem[]>({
  key: "allContentAtom",
  default: [],
});
