import { createContext } from 'react';

export const defaultSettings = {
  colorPreset: 'indigo',
  contrast: 'normal',
  direction: 'ltr',
  layout: 'horizontal',
  navColor: 'discrete',
  paletteMode: 'light',
  responsiveFontSizes: true,
  stretch: false,
};

export const initialState = {
  ...defaultSettings,
  isInitialized: false,
  openDrawer: false,
};

export const SettingsContext = createContext({
  ...initialState,
  handleDrawerClose: () => {},
  handleDrawerOpen: () => {},
  handleReset: () => {},
  handleUpdate: () => {},
  isCustom: false,
});
