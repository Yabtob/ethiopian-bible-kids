import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export const isNative = Capacitor.isNativePlatform();

export const setStatusBarColor = async (color: string, isLight: boolean) => {
  if (!isNative) return;
  
  try {
    await StatusBar.setBackgroundColor({ color });
    await StatusBar.setStyle({ style: isLight ? Style.Light : Style.Dark });
  } catch (e) {
    console.error('StatusBar error', e);
  }
};

export const hideSplashScreen = async () => {
  if (!isNative) return;
  try {
    await SplashScreen.hide();
  } catch (e) {
    console.error('SplashScreen error', e);
  }
};

export const shareContent = async (title: string, text: string, url?: string) => {
  const shareUrl = url || 'https://ethiopian-kids-bible.app';
  if (isNative) {
    try {
      await Share.share({
        title,
        text,
        url: shareUrl,
        dialogTitle: 'ለጓደኞችዎ ያጋሩ',
      });
      return true;
    } catch (e) {
      console.error('Share error', e);
      return false;
    }
  } else if (navigator.share) {
    try {
      await navigator.share({ title, text, url: shareUrl });
      return true;
    } catch (e) {
      return false;
    }
  } else {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(`${title}
${text}
${shareUrl}`);
      return 'clipboard';
    } catch (e) {
      return false;
    }
  }
};

export const shareApp = async () => {
  return await shareContent(
    'የህፃናት መጽሐፍ ቅዱስ',
    'ይህንን ድንቅ የህፃናት መጽሐፍ ቅዱስ አፕሊኬሽን ለልጆቻችሁ ተጠቀሙበት። ታሪኮች እና ጥቅሶች በአማርኛ ይገኛሉ!',
    'https://ethiopian-kids-bible.app'
  );
};