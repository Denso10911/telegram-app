import {PropsWithChildren} from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();


  // @ts-ignore
  return (
    <html lang={locale}>
    <body>
    <I18nProvider>
      <Root>
        {children}
      </Root>
    </I18nProvider>
    <script src="https://telegram.org/js/telegram-web-app.js" defer></script>
    <script defer>
      {`
             // Init TWA
        Telegram.WebApp.ready();

        // Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
        Telegram.WebApp.onEvent('themeChanged', function() {
            document.documentElement.className = Telegram.WebApp.colorScheme;
        });

        // Show main button
        Telegram.WebApp.MainButton.setParams({
            text: 'Main Button'
        });
        Telegram.WebApp.MainButton.onClick(function () {
            Telegram.WebApp.showAlert('Main Button was clicked')
        });\t
        Telegram.WebApp.MainButton.show();

        // Function to call showPopup API
        function showPopup() {
            Telegram.WebApp.showPopup({
                title: 'Title',
                message: 'Some message',
                buttons: [
                    {id: 'link', type: 'default', text: 'Open ton.org'},
                    {type: 'cancel'},
                ]
            }, function(btn) {
                if (btn === 'link') {
                    Telegram.WebApp.openLink('https://ton.org/');
                }
            });
        };

        // Function to toggle main TWA button
        function toggleMainButton() {
            if (Telegram.WebApp.MainButton.isVisible) {
                Telegram.WebApp.MainButton.hide();
            } else {
                Telegram.WebApp.MainButton.show();
            }
        };

        function setViewportData() {
            var sizeEl = document.getElementById('viewport-params-size');
            sizeEl.innerText = 'width: ' + window.innerWidth + ' x ' + 
                'height: ' + Telegram.WebApp.viewportStableHeight;

            var expandEl = document.querySelector('#viewport-params-expand');
            expandEl.innerText = 'Is Expanded: ' + (Telegram.WebApp.isExpanded ? 'true' : 'false');
        }

        Telegram.WebApp.setHeaderColor('secondary_bg_color');

        setViewportData();
        Telegram.WebApp.onEvent('viewportChanged', setViewportData);

        Telegram.WebApp.onEvent('themeChanged', function() {
            document.body.setAttribute('style', '--bg-color:' + Telegram.WebApp.backgroundColor);
        });


      `}
    </script>
    </body>
    </html>
  );
}
