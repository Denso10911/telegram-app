import {PropsWithChildren} from 'react';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';


export default async function RootLayout({ children }: PropsWithChildren) {

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
