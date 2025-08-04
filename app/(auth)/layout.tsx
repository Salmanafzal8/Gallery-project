
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" 
         style={{ backgroundImage: "url('/backgroundimage.jpg')" }}>
      <div className="min-h-screen w-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          {children}
        </div>
      </div>
    </div>
  );
}

