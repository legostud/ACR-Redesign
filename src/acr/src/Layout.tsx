/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';
import { useRouter } from 'next/router';
import { AtomicSearchInterface } from '@coveo/atomic-react';

import { beausite, playFair } from 'src/fonts';

import { Theme as RadixThemes } from '@radix-ui/themes';
import { Theme as ThemeProps } from './types/Theme.props';
import { ThemeContext } from 'src/context/Theme.context';
import { Theme } from './enumerations/Theme.enum';
import useCoveoSearchEgine from 'src/lib/coveo';

import cn from 'classnames';

import LinkBase from './components/ACR/Link/LinkBase';
import { ButtonStyle } from 'src/enumerations/ButtonStyle.enum';
import { Container } from '@radix-ui/themes';
import { useI18n } from 'next-localization';
import { dictionaryKeys } from 'variables/dictionary';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  title?: Field;
  summary?: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const { t } = useI18n();
  const engine = useCoveoSearchEgine();

  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const router = useRouter();

  const theme = fields.theme as ThemeProps;

  const skipLink = {
    value: {
      href: '#main-content',
      text: t(dictionaryKeys.SKIP_LINK_TEXT),
    },
  };

  const mainContentMsg = t(dictionaryKeys.SKIP_LINK_MESSAGE);

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.title?.value?.toString() || 'Page'}</title>
        <meta name="description" content={fields?.summary?.value?.toString() || 'Summary'} />
        <link rel="caconical" href={`${publicUrl}${router.asPath}`} />
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>
      <AtomicSearchInterface engine={engine}>
        <RadixThemes>
          {/* root placeholder for the app, which we add components to using route data */}
          <div className={cn(beausite.variable, playFair.variable, mainClassPageEditing)}>
            <header>
              <Container
                px="6"
                data-ref="skip link"
                className="absolute -top-full w-full opacity-0 transition-all focus-within:top-2 focus-within:opacity-100"
              >
                <LinkBase link={skipLink} style={ButtonStyle.BUTTON} />
              </Container>
              <div id="header">
                {route && <Placeholder name="headless-header" rendering={route} />}
              </div>
            </header>
            <main>
              <ThemeContext.Provider value={{ theme: theme?.name as Theme }}>
                <div id="content" data-theme={theme?.name}>
                  <Container px="6">
                    <div id="main-content" tabIndex={-1} className="group inline-block">
                      <span className="hidden p-2 group-focus:block">{mainContentMsg}</span>
                    </div>
                  </Container>
                  {route && <Placeholder name="headless-main" rendering={route} />}
                </div>
              </ThemeContext.Provider>
            </main>
            <footer>
              <div id="footer">
                {route && <Placeholder name="headless-footer" rendering={route} />}
              </div>
            </footer>
          </div>
        </RadixThemes>
      </AtomicSearchInterface>
    </>
  );
};

export default Layout;
