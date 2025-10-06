'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Edit3
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and statistics'
  },
  {
    title: 'Contact Messages',
    href: '/admin/contact-messages',
    icon: MessageSquare,
    description: 'Manage contact form submissions'
  },
  {
    title: 'Team Members',
    href: '/admin/team-members',
    icon: Users,
    description: 'Manage team members'
  },
  {
    title: 'Blog Management',
    href: '/admin/blog-management',
    icon: FileText,
    description: 'Create and manage blog posts'
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'View site analytics'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System settings'
  }
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white shadow-2xl"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-purple-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-purple-200 text-sm">Bitwreckers</p>
              </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-purple-600 shadow-lg'
                      : 'hover:bg-purple-700 hover:shadow-md'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="ml-3 flex-1"
                    >
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.description}
                      </div>
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-purple-700">
          <button className="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors w-full group">
            <LogOut size={20} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="ml-3 font-medium"
              >
                Sign Out
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
