'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [isExploreActive, setIsExploreActive] = useState(false);
  const [isConnectionsActive, setIsConnectionsActive] = useState(false);
  const [isMessagesActive, setIsMessagesActive] = useState(false);
  const [isInvestmentActive, setIsInvestmentActive] = useState(false);
  const [isMyProfileActive, setIsMyProfileActive] = useState(false);

``
  useEffect(() => {
    setIsDashboardActive(false);
    setIsExploreActive(false);
    setIsConnectionsActive(false);
    

    switch (pathname) {
      case '/dashboard':
        setIsDashboardActive(true);
        break;
      case '/explore':
        setIsExploreActive(true);
        break;
      case '/connections':
        setIsConnectionsActive(true);
        break;
      case '/myprofile':
        setIsMyProfileActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isDashboardActive,
    isExploreActive,
    isConnectionsActive,
    isMessagesActive,
    isMyProfileActive,
    isInvestmentActive,
    
  };
};

export default useNavigation;
