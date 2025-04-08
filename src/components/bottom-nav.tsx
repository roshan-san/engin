'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch, FaBell, FaEnvelope, FaChartBar } from 'react-icons/fa';

import useNavigation from '@/hook/use-navigation';
import useScrollingEffect from '@/hook/use-scroll';

const BottomNav = () => {
  const scrollDirection = useScrollingEffect();
  const navClass = scrollDirection === 'up' ? '' : 'opacity-25 duration-500';

  const {
    isExploreActive,
    isDashboardActive,
    isConnectionsActive,
    isInvestmentActive,
    isMessagesActive,
  } = useNavigation();

  return (
    <div
      className={`fixed bottom-0 w-full py-4 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border shadow-lg sm:hidden ${navClass}`}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">
        <Link href="/" className="flex items-center">
          <FaHome
            size={32}
            className={`${
              isDashboardActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
        </Link>
        <Link href="/explore" className="flex items-center">
          <FaSearch
            size={32}
            className={`${
              isExploreActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
        </Link>
        <Link href="/notifications" className="flex items-center">
          <FaBell
            size={32}
            className={`${
              isConnectionsActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
        </Link>
        <Link href="/messages" className="flex items-center">
          <FaEnvelope
            size={32}
            className={`${
              isMessagesActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
        </Link>
        <Link href="/investment" className="flex items-center">
          <FaChartBar
            size={32}
            className={`${
              isInvestmentActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
