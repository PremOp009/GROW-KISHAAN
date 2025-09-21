import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="container mx-auto">
            <div className="flex">
                <Sidebar>
                    <SidebarNav />
                </Sidebar>
                <SidebarInset>
                    <div className="p-4 sm:p-6 lg:p-8">
                       {children}
                    </div>
                </SidebarInset>
            </div>
        </div>
    </SidebarProvider>
  );
}
