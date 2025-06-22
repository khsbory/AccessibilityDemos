import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main 
        id="main-content" 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 focus:outline-none"
      >
        {children}
      </main>
    </div>
  );
}
