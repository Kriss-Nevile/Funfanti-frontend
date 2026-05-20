import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { FunfantiLogo } from './FunfantiLogo';

interface LogoBrandProps {
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  showTagline?: boolean;
}

export function LogoBrand({ size = 'md', showName = true, showTagline = false }: LogoBrandProps) {
  const sizeMap = {
    sm: 64,
    md: 96,
    lg: 160,
  };

  const logoSize = sizeMap[size];

  return (
    <View style={styles.container}>
      <FunfantiLogo size={logoSize} />

      {(showName || showTagline) && (
        <View style={styles.textContainer}>
          {showName && (
            <Text style={styles.brandName}>Funfanti</Text>
          )}
          {showTagline && (
            <Text style={styles.brandTagline}>Fun and Facts!</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  textContainer: {
    gap: spacing.xs,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.brand,
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
  },
});
