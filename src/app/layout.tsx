"use client"
import {PropsWithChildren, useEffect} from 'react';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';

declare global {
  interface Window {
    Telegram: any;
  }
}
declare const Telegram: any;


export default async function RootLayout({ children }: PropsWithChildren) {

  useEffect(() => {
    // Переконаємося, що код виконується тільки на клієнті
    if (typeof window !== "undefined" && window.Telegram) {
      // Налаштовуємо текст кнопки
      Telegram.WebApp.MainButton.setText("Натисни мене!");

      // Можна також змінити параметри кнопки (кольори, розміри тощо)
      Telegram.WebApp.MainButton.setParams({
        color: "#2cab37",
        text_color: "#ffffff",
      });

      // Додаємо обробник події на клік
      Telegram.WebApp.MainButton.onClick(() => {
        console.log("Кнопка була натиснута!");
        // Тут можна додати вашу логіку (наприклад, відправлення даних)
      });

      // Відображаємо кнопку
      Telegram.WebApp.MainButton.show();
    }
  }, []);

  return (
    <html>
    <body>
    <I18nProvider>
      <Root>
        {children}
      </Root>
    </I18nProvider>
    <script src="https://telegram.org/js/telegram-web-app.js" defer></script>

    </body>
    </html>
  );
}
