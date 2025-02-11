"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Sidebar/Topbar";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth/login/";

  return isLoginPage ? (
    <main className="flex items-center justify-center h-screen">{children}</main>
  ) : (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
