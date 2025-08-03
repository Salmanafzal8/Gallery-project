
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav>
      <button onClick={() => router.push("/")}>Home</button>
      <button onClick={() => router.push("/(home)/about us")}>About</button>
      <button onClick={() => router.push("/(home)/contact us")}>Contact</button>
    </nav>
  );
};

export default Navbar;
