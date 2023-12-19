import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="inline-block">
      <Image
          src='/images/harnsLogo.png'
        alt="Harns Logo"
        width={65}
        height={65}
      />
    </div>
  );
};
