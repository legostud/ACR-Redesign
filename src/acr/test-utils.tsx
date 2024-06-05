import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nProvider } from 'next-localization';
import { dictionaryKeys, mockDictionary } from 'variables/dictionary';

export type Children = {
  children?: React.ReactNode;
};

const AllTheProviders: FC<Children> = ({ children }) => {
  return (
    <I18nProvider lngDict={mockDictionary(dictionaryKeys)} locale="en">
      <>{children}</>
    </I18nProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
