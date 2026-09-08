"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  LayoutDashboard, Calendar, CalendarDays, Users, FileText,
  Settings, Book, Moon, Sun, Globe, AlertTriangle, Map
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Sidebar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: t("dashboard"), icon: LayoutDashboard },
    { href: `/${locale}/seances`, label: t("seances"), icon: Calendar },
    { href: `/${locale}/emploi`, label: "Emploi du Temps", icon: CalendarDays },
    { href: `/${locale}/cahier`, label: "Cahier de classe", icon: Book },
    { href: `/${locale}/programme`, label: "Progression Annuelle", icon: Map },
    { href: `/${locale}/suivi`, label: t("suivi"), icon: Users },
    { href: `/${locale}/rapports`, label: t("rapports"), icon: FileText },
    { href: `/${locale}/incidents`, label: "Incidents", icon: AlertTriangle },
    { href: `/${locale}/setup`, label: t("setup"), icon: Settings },
  ];

  const languages = [
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background shrink-0">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b gap-2">
        <div className="p-1.5 bg-blue-600 rounded-md">
          <Book className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight">Daftar EPS</p>
          <p className="text-xs text-muted-foreground">التربية البدنية</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== `/${locale}` && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="border-t p-3 space-y-1">
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Globe className="h-4 w-4" />
            <span>{languages.find((l) => l.code === locale)?.label}</span>
          </button>
          {langOpen && (
            <div className="absolute bottom-10 left-0 w-full rounded-md border bg-background shadow-lg z-10">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={pathname.replace(`/${locale}`, `/${lang.code}`)}
                  onClick={() => setLangOpen(false)}
                  className="block px-3 py-2 text-sm hover:bg-accent"
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
        </button>
      </div>
    </div>
  );
}
