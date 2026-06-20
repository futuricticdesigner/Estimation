import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar, { SIDEBAR_EXPANDED, SIDEBAR_COLLAPSED } from './Sidebar';
import Topbar from './Topbar';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

const STORAGE_KEY = 'az_sidebar_collapsed';

export default function Layout({ children, title, subtitle, topbarActions }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed,  setCollapsed ] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true');
  const [isDesktop,  setIsDesktop ] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const sidebarW = isDesktop ? (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED) : 0;

  return (
    <div className="flex min-h-screen bg-az-lightest">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggle={toggleCollapsed}
      />

      <motion.div
        className="flex-1 flex flex-col min-w-0"
        animate={{ paddingLeft: sidebarW }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen(true)}
          actions={topbarActions}
        />
        <main className="flex-1 p-4 lg:p-7">
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
