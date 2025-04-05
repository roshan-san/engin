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
      className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg sm:hidden ${navClass}`}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">
        <Link href="/" className="flex items-center">
          <FaHome
            size={32}
            className={`${
              isDashboardActive ? 'text-blue-500' : 'text-gray-500'
            }`}
          />
        </Link>
        <Link href="/explore" className="flex items-center">
          <FaSearch
            size={32}
            className={`${
              isExploreActive ? 'text-blue-500' : 'text-gray-500'
            }`}
          />
        </Link>
        <Link href="/notifications" className="flex items-center">
          <FaBell
            size={32}
            className={`${
              isConnectionsActive ? 'text-blue-500' : 'text-gray-500'
            }`}
          />
        </Link>
        <Link href="/messages" className="flex items-center">
          <FaEnvelope
            size={32}
            className={`${
              isMessagesActive ? 'text-blue-500' : 'text-gray-500'
            }`}
          />
        </Link>
        <Link href="/investments" className="flex items-center">
          <FaChartBar
            size={32}
            className={`${
              isInvestmentActive ? 'text-blue-500' : 'text-gray-500'
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
