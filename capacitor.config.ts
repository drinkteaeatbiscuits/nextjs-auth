import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'D23H3WR3TP.uk.co.topgift.app',
  appName: 'Top Gift',
  webDir: 'public',
  server: {
    androidScheme: 'https',
    url: "https://nextjs-auth-drinkteaeatbiscuits.vercel.app",
    cleartext: true
  },
};

export default config;
