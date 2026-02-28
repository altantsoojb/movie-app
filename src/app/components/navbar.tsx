"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Film, Search } from "lucide-react";
import Link from "next/link";
import { DropdownMenuButton } from "./dropdown";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import MovieSearchDropdown from "@/components/ui/dropdownsearch";
import { Genre } from "@/lib/types";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex justify-between items-center p-3 h-14.75 bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100">
      <div className="pl-5">
        <Link href="./">
          <div className="text-[#4338CA] flex h-5 justify-between w-23 ">
            <Film />
            <p className="pt-0.5 font-inter font-bold italic text-5 leading-5 tracking-[0.02em] align-middle">
              Movie Z
            </p>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex w-122 justify-between items-center">
        <DropdownMenuButton genres={[]} />
        <div className="w-95 h-9">
          <MovieSearchDropdown />
        </div>
      </div>
      <div className="h-9 w-21 flex justify-between items-center">
        <Button variant="outline" className="md:hidden" size="icon">
          <Search className="text-gray-700 dark:text-gray-200" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="text-gray-800 border-gray-300 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          {isDark ? <Moon /> : <Sun />}
        </Button>
      </div>
    </div>
  );
}
