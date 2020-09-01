import { useCallback } from "react";
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

export function useBackButtonAsExit() {
  const backButtonListener = useCallback((e: any) => {
    e.detail.register(-1, () => {
      App.exitApp();
    });
  }, [])

  const didEnter = useCallback(() => {
    document.addEventListener('ionBackButton', backButtonListener);
  }, [backButtonListener])

  const didLeave = useCallback(() => {
    document.removeEventListener('ionBackButton', backButtonListener);
  }, [backButtonListener])

  return { didEnter, didLeave };
}
