"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  siteConfig.components.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="md:hidden flex gap-10 w-full items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Open navigation">
            <HamburgerMenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="h-dvh w-1/2 rounded-none flex flex-col flex-1 justify-start items-start border-none"
        >
          <SheetHeader className="w-full">
            <SheetTitle className="w-full text-center">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 justify-center"
              >
                {siteConfig.name}
                <Badge variant="outline" className="text-normal">
                  Beta
                </Badge>
              </Link>
            </SheetTitle>
            <ScrollArea className="flex flex-col gap-3">
              <div className="flex flex-col gap-16 items-start mt-5">
                <div className="flex flex-col gap-5 items-start">
                  <span className="scroll-m-20 text-sm font-medium tracking-tight">
                    Getting Started
                  </span>
                  {siteConfig.docs.map((doc) => (
                    <Link
                      key={doc.path}
                      href={doc.path}
                      className="flex items-center gap-3"
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className={cn(
                          "hover:no-underline text-muted-foreground hover:text-foreground px-0",
                          pathname === `${doc.path}` && "text-foreground"
                        )}
                      >
                        {doc.title}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-5 items-start">
                  <span className="scroll-m-20 text-sm font-medium tracking-tight">
                    Components
                  </span>
                  {siteConfig.components.map((component) => (
                    <Link
                      key={component.path}
                      href={component.path}
                      className="flex items-center gap-3"
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className={cn(
                          "hover:no-underline text-muted-foreground hover:text-foreground px-0",
                          pathname === `${component.path}` && "text-foreground"
                        )}
                      >
                        {component.title}
                      </Button>
                      {component.new && <Badge variant="outline">New</Badge>}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-5 items-start">
                  <span className="scroll-m-20 text-sm font-medium tracking-tight">
                    Sections
                  </span>
                  {siteConfig.sections.map((component) => (
                    <Link
                      key={component.path}
                      href={component.path}
                      className="flex items-center gap-3"
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className={cn(
                          "hover:no-underline text-muted-foreground hover:text-foreground px-0",
                          pathname === `${component.path}` && "text-foreground"
                        )}
                      >
                        {component.title}
                      </Button>
                      {component.new && <Badge variant="outline">New</Badge>}
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
