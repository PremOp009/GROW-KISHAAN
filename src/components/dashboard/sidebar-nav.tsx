'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, List, GitPullRequest, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const links = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/listings/new', label: 'New Listing', icon: List },
  { href: '/dashboard/requests', label: 'Requests', icon: GitPullRequest },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Icons.Logo className="w-6 h-6 text-primary"/>
            <span className="font-bold text-lg font-headline">GROW KISHAAN</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  className="w-full justify-start"
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2"/>
        <p className="text-xs text-muted-foreground p-2">
            © {new Date().getFullYear()} GROW KISHAAN
        </p>
      </SidebarFooter>
    </>
  );
}
