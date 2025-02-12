'use client';

import {backButton, setMiniAppBottomBarColor, mountMainButton, setMainButtonParams} from '@telegram-apps/sdk-react';
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
    mountMainButton()
    setMainButtonParams({
      text: "test",
      isVisible: true,

    })
    setMiniAppBottomBarColor("#ff0000")
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