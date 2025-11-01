import React, { useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { AuthService } from '../services/auth/auth-service';

interface AuthButtonProps {
  onAuthenticated?: (address: string) => void;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onAuthenticated,
  className = 'auth-button',
}) => {
  const { ready, authenticated, user, login, logout, connectWallet } =
    usePrivy();
  const { wallets } = useWallets();
  const authService = AuthService.getInstance();

  useEffect(() => {
    if (authenticated && user) {
      authService.setUser(user);

      const walletAddress = wallets?.[0]?.address || user?.wallet?.address;

      if (walletAddress && onAuthenticated) {
        onAuthenticated(walletAddress);
      }
    } else {
      authService.setUser(null);
    }
  }, [authenticated, user, wallets, onAuthenticated]);

  const handleLogin = async () => {
    try {
      authService.setLoading(true);
      await login();

      if (authenticated && !wallets.length) {
        await connectWallet();
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      authService.setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      authService.setLoading(true);
      await logout();
      authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      authService.setLoading(false);
    }
  };

  const getButtonText = () => {
    if (!ready) return 'Loading...';
    if (authenticated) {
      const address = wallets?.[0]?.address || user?.wallet?.address;
      if (address) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
      }
      return 'Connect Wallet';
    }
    return 'Connect Wallet';
  };

  const isConnected = authenticated && (wallets.length > 0 || user?.wallet);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <button
        className={`outline-solid active:bg-fg/80 transform rounded-lg bg-fg px-6 py-3 font-primary text-bg shadow-b shadow-fg/50 outline-offset-[6px] transition-all duration-200 hover:bg-fg/90 focus:outline-dashed focus:outline-[3px] focus:outline-fg/50 active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 ${
          isConnected ? 'ring-2 ring-hl' : ''
        }`}
        onClick={authenticated ? handleLogout : handleLogin}
        disabled={!ready}
      >
        <span className='mr-2'>💳</span>
        {getButtonText()}
      </button>

      {authenticated && !wallets.length && !user?.wallet && (
        <button
          className='transform rounded-lg border-2 border-fg bg-transparent px-4 py-2 font-primary text-fg transition-all duration-200 hover:bg-fg/10 active:translate-y-[2px]'
          onClick={connectWallet}
        >
          Connect Wallet to Play
        </button>
      )}

      {authenticated && wallets.length > 0 && (
        <div className='text-sm text-hl'>
          <span>Connected to Monad Testnet</span>
        </div>
      )}
    </div>
  );
};
