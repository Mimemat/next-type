import React from 'react';

import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className={`flex items-center justify-center pb-4 pt-8`}>
      <h1
        className={`text-5xl text-primary cursor-pointer`}
        onClick={() => {
          if (router.pathname !== '/') return router.push('/');
          router.reload();
        }}
      >
        Next Type
      </h1>
    </header>
  );
};

export default Header;
