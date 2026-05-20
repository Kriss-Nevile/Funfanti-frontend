import { Image, Platform, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const funfantiLogoAsset = require('../../funfanti.svg');

const nativeFallbackSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <circle cx="60" cy="60" r="58" fill="#E2F4CC" />
  <circle cx="60" cy="60" r="40" fill="#9EC859" />
  <path d="M42 38h18c10 0 18 8 18 18s-8 18-18 18H42V38zm16 28c5 0 9-4 9-10s-4-10-9-10h-5v20h5z" fill="#0A0D09" />
</svg>`;

type FunfantiLogoProps = {
  size?: number;
};

export function FunfantiLogo({ size = 48 }: FunfantiLogoProps) {
  if (Platform.OS === 'web') {
    return (
      <Image
        source={funfantiLogoAsset}
        style={[styles.logo, { width: size, height: size }]}
        resizeMode="contain"
      />
    );
  }

  return <SvgXml xml={nativeFallbackSvg} width={size} height={size} />;
}

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});