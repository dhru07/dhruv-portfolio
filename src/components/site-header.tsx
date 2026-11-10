"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";

const roleLinks = [
  { href: "/roles/data-analyst", label: "Data Analyst" },
  { href: "/roles/data-engineer", label: "Data Engineer" },
  { href: "/roles/data-scientist", label: "Data Scientist · Emerging" },
  { href: "/roles/ai-engineer", label: "AI Engineer · Emerging" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: Readonly<{ pathname: string }>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const previousY = useRef(0);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const roleIsActive = roleLinks.some((role) => pathname === role.href || pathname.startsWith(`${role.href}/`));

  useEffect(() => {
    previousY.current = window.scrollY;
    const frame = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    return () => cancelAnimationFrame(frame);
  }, []);

  useMotionValueEvent(scrollY, "change", (currentY) => {
    const delta = currentY - previousY.current;
    setScrolled(currentY > 8);
    if (currentY < 48 || delta < -2 || menuOpen || rolesOpen) setHidden(false);
    else if (delta > 2) setHidden(true);
    previousY.current = currentY;
  });

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      if (rolesOpen) {
        setRolesOpen(false);
        rolesRef.current?.querySelector("button")?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
  }

  return (
    <motion.header
      animate={{ y: hidden && !reduceMotion && !menuOpen && !rolesOpen ? "-100%" : "0%" }}
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      onKeyDown={handleKeyDown}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      <div className="header-inner container">
        <Link aria-label={`${profile.name} home`} className="wordmark" href="/" onClick={() => setMenuOpen(false)}>
          <span>{profile.name}</span>
        </Link>

        <button
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="icon-button menu-toggle"
          onClick={() => {
            setMenuOpen((open) => !open);
            setRolesOpen(false);
          }}
          ref={menuButtonRef}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>

        <nav aria-label="Main navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} id="main-navigation">
          <Link aria-current={pathname === "/experience" ? "page" : undefined} className={`nav-link${pathname === "/experience" ? " is-active" : ""}`} href="/experience">Experience</Link>
          <div className={`roles-menu-wrap${rolesOpen ? " is-open" : ""}`} ref={rolesRef}>
            <button
              aria-controls="roles-menu"
              aria-expanded={rolesOpen}
              className={`nav-link roles-trigger${roleIsActive ? " is-active" : ""}`}
              onClick={() => setRolesOpen((open) => !open)}
              type="button"
            >
              Roles <ChevronDown aria-hidden="true" size={15} />
            </button>
            <div className="roles-menu" id="roles-menu">
              {roleLinks.map((role) => {
                const active = pathname === role.href || pathname.startsWith(`${role.href}/`);
                return <Link aria-current={active ? "page" : undefined} className="roles-menu-link" href={role.href} key={role.href}>{role.label}</Link>;
              })}
            </div>
          </div>
          <Link aria-current={pathname === "/about" ? "page" : undefined} className={`nav-link${pathname === "/about" ? " is-active" : ""}`} href="/about">About</Link>
          <Link aria-current={pathname === "/contact" ? "page" : undefined} className={`nav-link${pathname === "/contact" ? " is-active" : ""}`} href="/contact">Contact</Link>
          <div className="nav-theme"><ThemeToggle /></div>
        </nav>
      </div>
    </motion.header>
  );
}
