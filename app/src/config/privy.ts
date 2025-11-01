// Privy configuration
export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';

export const privyConfig = {
  appearance: {
    theme: 'light',
    accentColor: '#1a1a1a',
    logo: 'https://your-logo-url.com/logo.png',
  },
  loginMethods: ['wallet'],
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
  },
  defaultChain: {
    id: 41434, // Monad Testnet
    name: 'Monad Testnet',
  },
};


