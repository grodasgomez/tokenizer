import { Bell, Home, CircleDollarSign, Menu, LayoutGrid, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function Layout() {
  const items = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: DollarSign,
      label: "Expenses",
      href: "/expenses",
    },
    {
      icon: LayoutGrid,
      label: "Categories",
      href: "/categories",
    },

  ];
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <CircleDollarSign className="h-6 w-6" />
              <span className="">Expenses Tracker</span>
            </a>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {items.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) => {
                    return isActive
                      ? "flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-primary/10"
                      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <CircleDollarSign className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </a>
                {items.map((item) => {
                  return (
                    <NavLink
                      key={item.label}
                      to={item.href}
                      className={({ isActive }) => {
                        return isActive
                          ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-primary bg-primary/10"
                          : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Layout;
