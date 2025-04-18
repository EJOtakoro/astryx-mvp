import React from 'react';

interface NuuronLogoProps {
  size?: 'small' | 'medium' | 'large';
}

const NuuronLogo: React.FC<NuuronLogoProps> = ({ size = 'medium' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-3xl';
      case 'medium':
        return 'text-4xl';
      case 'large':
        return 'text-5xl';
      default:
        return 'text-4xl';
    }
  };

  return (
    <h1 className={`${getSizeClass()} font-bold text-primary`}>
      Nuuron
    </h1>
  );
};

export default NuuronLogo;
