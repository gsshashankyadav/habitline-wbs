import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SlideButton from "./SlideButton";

export default function Header() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);

  // Desktop scroll transforms
  const logoX = useTransform(scrollY, [0, 200], [0, 195]);
  const navScale = useTransform(scrollY, [0, 200], [1, 1.08]);
  const actionsX = useTransform(scrollY, [0, 200], [0, -195]);

  const navItems = [
    { label: "What's inside", href: "#whats-inside" },
    { label: "Use case", href: "#use-case" },
    { label: "Metrics", href: "#metrics" },
    { label: "Smart Assist", href: "#smart-assist" },
  ];

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <motion.header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 hidden md:block">
        <div className="max-w-7xl mx-auto">
          <motion.nav className="flex items-center justify-between">
            {/* Logo */}
            {/* <motion.div style={{ x: logoX }}>
              <a className="bg-white px-2 py-2 rounded-3xl shadow-lg">
                <img src="/logo.svg" width="134" height="32" alt="Logo" />
              </a>
            </motion.div> */}
            <motion.div
              style={{ x: logoX }}
              className="flex gap-2 bg-white px-4 py-4 rounded-3xl shadow-lg"
            >
              <img src="/logo.svg" width="134" height="32" alt="Logo" />
            </motion.div>

            {/* Nav */}
            <motion.div
              style={{ scale: navScale }}
              className="flex items-center bg-white px-2 py-2 rounded-3xl shadow-lg"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-7 py-3 text-sm font-medium rounded-full hover:bg-gray-100"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              style={{ x: actionsX }}
              className="flex gap-2 bg-white px-2 py-2 rounded-3xl shadow-lg"
            >
              <ActionButton src="/icons/app-store.svg" />
              <ActionButton src="/icons/play-store.svg" />
            </motion.div>
          </motion.nav>
        </div>
      </motion.header>

      {/* ================= MOBILE HEADER ================= */}
      <motion.header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:hidden">
        <div className="max-w-[95%] mx-auto">
          {/* Single Island */}
          <div className="flex items-center justify-between bg-white px-3 py-3 rounded-3xl shadow-xl">
            {/* Logo */}
            <img src="/logo.svg" width="110" height="26" alt="Logo" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ActionButton src="/icons/app-store.svg" />
              <ActionButton src="/icons/play-store.svg" />

              {/* Hamburger */}
              <motion.button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-7 py-3 text-sm font-medium rounded-full hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}

/* ================= Reusable Action Button ================= */
function ActionButton({ src }) {
  return (
    <SlideButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 bg-gray-200 rounded-xl shadow flex items-center justify-center"
    >
      <img src={src} width="20" height="20" alt="" />
    </SlideButton>
  );
}
