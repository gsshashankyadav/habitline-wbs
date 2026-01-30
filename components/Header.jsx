import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SlideButton from "./SlideButton";

export default function Header() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);

  // Desktop scroll transforms
  const logoX = useTransform(scrollY, [0, 200], [0, 170]);
  const navX = useTransform(scrollY, [0, 200], [-20, 0]);
  const actionsX = useTransform(scrollY, [0, 200], [0, -170]);

  const navItems = [
    { label: "What's inside", href: "#whats-inside" },
    { label: "Use case", href: "#use-case" },
    { label: "Metrics", href: "#metrics" },
    { label: "Smart Assist", href: "#smart-assist" },
  ];

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <motion.header className="fixed top-0 left-0 right-0 z-50  max-w-[1260px] py-[30px] hidden md:block mx-auto">
        <div className="px-[30px] ">
          <motion.nav className="flex items-center justify-between gap-[6px] h-[64px]" >
            {/* Logo */}
            <motion.div
              style={{ x: logoX }}
              className="flex gap-2 bg-white px-4 py-4 rounded-[20px] shadow-lg "
            >
              <img src="/logo.svg" width="134" height="32" alt="Logo" />
            </motion.div>

            {/* Nav */}
            <motion.div

              style={{x : navX,  fontFamily:`"Google Sans Flex", "Google Sans Flex Placeholder", sans-serif` }}
              className="flex items-center bg-white p-[6px] gap-[6px] rounded-[20px] shadow-lg leading-[1] h-full"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-7 py-4 text-[15px] text-[#494d4d] font-medium rounded-[16px] hover:bg-[#e8e8e8]"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              style={{ x: actionsX }}
              className="flex gap-2 bg-white p-[6px] rounded-[20px] shadow-lg h-full"
            >
              <ActionButton src="/icons/app-store.svg" />
              <ActionButton src="/icons/play-store.svg" />
            </motion.div>
          </motion.nav>
        </div>
      </motion.header>

      {/* ================= MOBILE HEADER ================= */}
      <motion.header className="fixed top-0 left-0 right-0 z-50 px-5 py-5 md:hidden">
        <div className="mx-auto">
          {/* Single Island */}
          <div className="flex items-center justify-between bg-white p-[10px] rounded-2xl shadow-xl">
            {/* Logo */}
            <img src="/logo.svg" width="134" height="32" alt="Logo" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ActionButton src="/icons/app-store.svg"/>
              <ActionButton src="/icons/play-store.svg" />

              {/* Hamburger */}
                <motion.button
                  onClick={() => setOpen(!open)}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center"
                >
                  {/* Top line */}
                  <motion.span
                    className="absolute w-5 h-[2px] bg-gray-700 rounded-full"
                    animate={
                      open
                        ? { rotate: 45, y: 0 }
                        : { rotate: 0, y: -3 }
                    }
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />

                  {/* Bottom line */}
                  <motion.span
                    className="absolute w-5 h-[2px] bg-gray-700 rounded-full"
                    animate={
                      open
                        ? { rotate: -45, y: 0 }
                        : { rotate: 0, y: 3 }
                    }
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                </motion.button>

            </div>
          </div>

          {/* Backdrop Overlay */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 -z-10"
                style={{
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(19, 21, 21, 0.1)",
                  willChange: "transform",
                }}
                onClick={() => setOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Mobile Menu */}
          <AnimatePresence>
  {open && (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: 10,
        height: "auto",
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      exit={{ y: 0, opacity: 0, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden p-3 flex flex-col gap-[6px]"
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block p-[6px] text-[#494d4d] text-[15px] font-medium rounded-full hover:bg-gray-100 h-[31.5px] flex items-center"
          style={{
            fontFamily: `"Google Sans Flex", "Google Sans Flex Placeholder", sans-serif`,
          }}
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
      className="w-[32px] h-[32px] md:w-[50px] md:h-[50px] bg-gray-200 rounded-lg  shadow flex items-center justify-center"
    >
      <img src={src} className="w-[16px] h-[16px] md:w-[22px] md:h-[22px]" alt=""/>
    </SlideButton>
  );
}
