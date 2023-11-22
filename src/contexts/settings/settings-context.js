import { createContext } from 'react';

export const defaultSettings = {
  colorPreset: 'red',
  contrast: 'normal',
  direction: 'ltr',
  layout: 'vertical',
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
