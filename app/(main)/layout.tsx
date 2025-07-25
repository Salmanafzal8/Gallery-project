import Sidebar from "../_components/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex">
    <Sidebar/>{children}</div>;
}
