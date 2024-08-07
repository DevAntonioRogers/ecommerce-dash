"use client";
import { useMenuStore } from "@/store/toggleMenuStore";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function MenuToggle() {
  const { isOpen, toggleMenu } = useMenuStore();
  return (
    <button onClick={toggleMenu}>
      <motion.div
        animate={{ rotate: isOpen ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isOpen ? <ChevronsRight /> : <ChevronsLeft />}
      </motion.div>
    </button>
  );
}
