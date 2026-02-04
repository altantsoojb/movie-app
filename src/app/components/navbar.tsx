import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Film } from "lucide-react";
import { Moon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between p-3 h-14.75">
      <div className="text-[#4338CA] flex h-5  pt-2 justify-between w-23">
        <Film />
        <p className="pt-0.5 font-inter font-bold italic text-5 leading-5 tracking-[0.02em] align-middle">
          Movie Z
        </p>
      </div>
      <div className="hidden md:flex w-122 justify-between">
        <div>
          <Button variant="outline" size="sm" className="w-24.25 h-9">
            <ChevronDown /> Genre
          </Button>
        </div>
        <div className="w-95 h-9">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{}</InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div className="h-9 w-21 flex justify-between">
        <Button variant="outline" className="md:hidden" size="icon">
          <Search />
        </Button>
        <Button variant="outline" size="icon">
          <Moon />
        </Button>
      </div>
    </div>
  );
}
