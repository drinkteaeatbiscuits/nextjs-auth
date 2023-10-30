import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uk.co.topgift.app',
  appName: 'Top Gift',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: "https://nextjs-auth-drinkteaeatbiscuits.vercel.app",
    cleartext: true
  }
};

export default config;
