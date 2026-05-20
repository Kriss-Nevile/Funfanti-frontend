import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { FunfantiLogo } from './FunfantiLogo';

type ArtBlockProps = {
  tone: string;
  variant: 'hero' | 'card' | 'quiz';
  imageUrl?: string;
  showLogo?: boolean;
};

export function ArtBlock({ tone, variant, imageUrl, showLogo = true }: ArtBlockProps) {
  return (
    <View style={[styles.base, styles[variant], { backgroundColor: tone }]}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : null}
      {/* Gradient overlay for depth */}
      <View style={styles.gradientOverlay} />
      {/* Concentric rings */}
      <View style={styles.largeRing} />
      <View style={styles.mediumRing} />
      <View style={styles.smallRing} />
      {/* Center badge */}
      <View style={styles.centerBadge}>
        {showLogo ? <FunfantiLogo size={40} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  hero: {
    minHeight: 240,
    borderRadius: 28,
  },
  card: {
    width: 88,
    height: 88,
    borderRadius: 20,
  },
  quiz: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    marginBottom: 20,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  largeRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 18,
    borderColor: 'rgba(255,255,255,0.22)',
    top: 0,
    right: -30,
  },
  mediumRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 14,
    borderColor: 'rgba(255,255,255,0.15)',
    bottom: 20,
    left: -10,
  },
  smallRing: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 12,
    borderColor: 'rgba(255,255,255,0.28)',
    bottom: 10,
    left: 14,
  },
  icon: {
    width: 68,
    height: 68,
  },
  centerBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: 'rgba(13,27,42,0.18)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
});
