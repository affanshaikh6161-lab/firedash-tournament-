"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Calendar, LayoutDashboard, User, BarChart3, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Zap },
  { name: 'Matches', href: '/matches', icon: Calendar },
  { name: 'Leaderboard', href: '/leaderboard', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Admin', href: '/admin', icon: LayoutDashboard },
];

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border md:top-0 md:bottom-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-glow">
              <Trophy className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">FIREDASH TOURNAMENT</span>
          </Link>

          <div className="flex w-full md:w-auto justify-around md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-md transition-all duration-200",
                  pathname === item.href 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] md:text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
