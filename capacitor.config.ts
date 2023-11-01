import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: '3e0947af',
  appName: 'Top Gift',
  webDir: 'public',
  server: {
    androidScheme: 'https',
    url: "https://nextjs-auth-drinkteaeatbiscuits.vercel.app",
    cleartext: true
  }
};

export default config;
