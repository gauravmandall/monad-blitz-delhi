import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RiTeamFill } from 'react-icons/ri';

import { AuthButton } from '@/components/AuthButton';
import Button from '@/components/Button/Button';
import ChatBox from '@/components/Chat/ChatBox';
import Input from '@/components/Input';
import Kbd from '@/components/Kbd';
import AnimateFade from '@/components/Layout/AnimateFade';
import Seo from '@/components/Seo';

import { useRoomContext } from '@/context/Room/RoomContext';

export default function HomePage() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();

  const methods = useForm<{ code: string }>({
    mode: 'onTouched',
  });

  const { dispatch } = useRoomContext();

  const isWalletConnected =
    ready && authenticated && (wallets.length > 0 || false);

  return (
    <AnimateFade>
      <Seo title='Monad Challenge - Multiplayer Typing' />

      <main>
        <section>
          <div className='layout flex min-h-[70vh] flex-col items-center justify-center gap-8 pt-8 text-center'>
            <div className='relative flex h-8 w-full max-w-[800px] items-center justify-between'>
              <ChatBox
                className='right-3 w-[calc(100%+2rem)] sm:right-2'
                label='public chat'
              />
            </div>

            {!isWalletConnected ? (
              // Connect Wallet Screen
              <div className='flex w-full max-w-[500px] flex-col items-center gap-6'>
                <RiTeamFill className='text-[5rem] text-fg' />
                <h1 className='text-3xl font-bold'>Monad Challenge</h1>
                <p className='text-lg text-hl'>
                  Connect your wallet to join or create multiplayer pools
                </p>
                <div className='mt-4'>
                  <AuthButton className='flex flex-col items-center gap-4' />
                </div>
                <div className='mt-4 text-sm text-fg/70'>
                  <p>Make sure you're connected to Monad Testnet</p>
                </div>
              </div>
            ) : (
              // Multiplayer Options Screen
              <>
                <div className='flex w-full max-w-[500px] flex-col items-center gap-6'>
                  <RiTeamFill className='text-[5rem] text-fg' />
                  <h1 className='text-3xl font-bold'>Monad Challenge</h1>
                  <p className='text-lg text-hl'>
                    Ready to compete? Join or create a multiplayer pool
                  </p>

                  <FormProvider {...methods}>
                    <Input
                      placeholder='enter your nickname'
                      autoComplete='off'
                      name='nickname'
                      id='nickname'
                      maxLength={14}
                      defaultValue={localStorage?.getItem('nickname') || ''}
                      onBlur={(e) => {
                        if (!e.target.value) return;
                        dispatch({
                          type: 'SET_NICKNAME',
                          payload: e.target.value,
                        });
                      }}
                      className='text-center'
                    />
                  </FormProvider>

                  <div className='flex flex-col items-center gap-4'>
                    <Button
                      onClick={() => router.push('/multiplayer')}
                      className='flex w-full max-w-[300px] items-center justify-center'
                    >
                      <RiTeamFill className='mr-2' />
                      Join or Create Pool
                    </Button>

                    <div className='mt-4'>
                      <AuthButton className='text-sm' />
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-2 font-primary'>
                  <div className='flex items-center space-x-2 text-sm'>
                    <Kbd>tab</Kbd>
                    <span className='text-hl'> + </span>
                    <Kbd>enter</Kbd>
                    <span className='text-hl'> - restart test </span>
                  </div>
                  <div className='flex items-center space-x-2 text-sm'>
                    <Kbd>ctrl/cmd</Kbd>
                    <span className='text-hl'> + </span>
                    <Kbd>k</Kbd>
                    <span className='text-hl'> or </span>
                    <Kbd>p</Kbd>
                    <span className='text-hl'> - command palette </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
