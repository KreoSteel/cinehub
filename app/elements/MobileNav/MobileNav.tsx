import SearchBar from "@/app/features/SearchMedia/ui/SearchBar";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/app/shared/shadcn-ui/drawer";
import Button from "@/app/shared/ui/Button";
import MobileNavAuthActions from "./MobileNavAuthActions";
import MobileNavCards from "./MobileNavCards";
import { Menu } from "lucide-react";

export default function MobileNav() {
  return (
    <Drawer swipeDirection="down" showSwipeHandle>
      <DrawerTrigger render={<Button><Menu /></Button>} />
      <DrawerContent>
        <DrawerHeader className="rounded-none">
          <SearchBar />
        </DrawerHeader>
        <MobileNavCards />
        <DrawerFooter className="grid grid-flow-col gap-4 grid-cols-2 pt-5">
          <MobileNavAuthActions />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
