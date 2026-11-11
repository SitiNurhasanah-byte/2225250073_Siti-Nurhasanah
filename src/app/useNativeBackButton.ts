import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';

/** Tombol "kembali" fisik Android: mundur satu halaman, atau keluar dari Beranda. */
export function useNativeBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const handle = CapApp.addListener('backButton', () => {
      if (location.pathname === '/') CapApp.exitApp();
      else navigate(-1);
    });
    return () => {
      handle.then((h) => h.remove());
    };
  }, [navigate, location.pathname]);
}
