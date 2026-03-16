import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../UI/Button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
];

const Header = () => {
  return (
    <header className="w-full flex justify-center">

      <div
        className="
        max-w-[800px] w-full
        flex items-center justify-between
        py-4 px-8 my-4
        rounded-full
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-xl
        fixed z-50
        "
      >

        <nav className="flex gap-2 relative">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-full transition-colors duration-200 ${
                  isActive ? "text-black" : "text-white hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        duration: 0.6,
                      }}
                      className="absolute inset-0 bg-yellow-400 rounded-full -z-10"
                    />
                  )}
                  {item.name}
                </>
              )}
            </NavLink>
          ))}

        </nav>
          

        <Button title={"Let's Talk"}/>
        {/* <button className="border border-white/20 px-5 py-2 rounded-full hover:bg-white/10 transition"> */}
          {/* Let's Talk */}
        {/* </button> */}

      </div>

    </header>
  );
};

export default Header;