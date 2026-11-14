import { Footer } from './Footer';

export function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#090909] text-[#f3efe7]">
      <main>{children}</main>
      <Footer />
    </div>
  );
}
