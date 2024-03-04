import { Navbar } from "@/components/dashboard/navbar";
import { OrganizationSidebar } from "@/components/dashboard/organization-sidebar";
import { Sidebar } from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="h-full">
      <Sidebar />
      <section className="h-full pl-[60px]">
        <div className="flex gap-x-3 h-full">
            <OrganizationSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
        </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
