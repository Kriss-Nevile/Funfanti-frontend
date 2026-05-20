import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, shadows, borderRadius } from '../theme/spacing';

type BottomNavProps = {
  activeTab: 'home' | 'discover' | 'quiz' | 'profile';
  onSelect: (tab: 'home' | 'discover' | 'quiz' | 'profile') => void;
};

const navItems = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'discover', label: 'Explore', icon: 'search' },
  { key: 'quiz', label: 'Quiz', icon: 'help-circle' },
  { key: 'profile', label: 'Profile', icon: 'user' },
] as const;

export function BottomNav({ activeTab, onSelect }: BottomNavProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        {navItems.map((item) => {
          const active = activeTab === item.key;
          return (
            <Pressable
              key={item.key}
              style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
              onPress={() => onSelect(item.key)}
            >
              <View style={[styles.navPill, active && styles.navPillActive]}>
                <Feather
                  name={item.icon}
                  size={18}
                  color={active ? colors.brand : colors.textMuted}
                />
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navItemPressed: {
    opacity: 0.8,
  },
  navPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    gap: 4,
  },
  navPillActive: {
    backgroundColor: colors.brandGreenLight,
  },
  navLabel: {
    color: colors.textMuted,
    fontWeight: '500',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  navLabelActive: {
    color: colors.brand,
    fontWeight: '600',
  },
});
