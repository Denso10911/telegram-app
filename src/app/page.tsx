'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';

import tonSvg from './_assets/ton.svg';
import {useEffect} from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}
declare const Telegram: any;



export default function Home() {
  const t = useTranslations('i18n');



  useEffect(() => {
    // Переконаємося, що код виконується тільки на клієнті
    if (typeof window !== "undefined" && window.Telegram) {
      // Налаштовуємо текст кнопки
      Telegram.WebApp.MainButton.setText("Натисни мене!");

      // Можна також змінити параметри кнопки (кольори, розміри тощо)
      Telegram.WebApp.MainButton.setParams({
        color: "#2cab37",
        text_color: "#ffffff",
        is_active: false,
        is_visible: false,
        position: "left"
      });

      // Додаємо обробник події на клік
      Telegram.WebApp.MainButton.onClick(() => {
        console.log("Кнопка була натиснута!");
        // Тут можна додати вашу логіку (наприклад, відправлення даних)
      });
    }
  }, []);

  return (
    <Page back={false}>
      <List>
        <Section
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Link href="/ton-connect">
            <Cell
              before={
                <Image
                  src={tonSvg.src}
                  style={{ backgroundColor: '#007AFF' }}
                />
              }
              subtitle="Connect your TON wallet"
            >
              TON Connect
            </Cell>
          </Link>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link href="/init-data">
            <Cell subtitle="User data, chat information, technical data">
              Init Data
            </Cell>
          </Link>
          <Link href="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">
              Launch Parameters
            </Cell>
          </Link>
          <Link href="/theme-params">
            <Cell subtitle="Telegram application palette information">
              Theme Parameters
            </Cell>
          </Link>
        </Section>
        <Section header={t('header')} footer={t('footer')}>
          <LocaleSwitcher/>
        </Section>
      </List>
    </Page>
  );
}
