'use client';

import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";

export default function NavbarWrapper() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark", !isDarkTheme);
  };

  return <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />;
}
