"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function useRouteCheck(routeNames: string[]) {
  const pathname = usePathname();
  const [isRoute, setIsRoute] = useState(false);

  useEffect(() => {
    setIsRoute(routeNames.includes(pathname.split("/")[1]));
  }, [pathname, routeNames]);

  return isRoute;
}

export default useRouteCheck;
