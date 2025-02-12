'use client';

import { backButton, themeParams, mainButton, setMiniAppBottomBarColor } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Page({ children, back = true }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean
}>) {
  const router = useRouter();

  useEffect(() => {
    mainButton.setParams({
      text: 'Main',
    })
    setMiniAppBottomBarColor("#f10000")
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);



  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return <>{children}</>;
}