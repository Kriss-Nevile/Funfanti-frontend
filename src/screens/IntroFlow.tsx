import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArtBlock } from '../components/ArtBlock';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors } from '../theme/colors';
import { onboardingSlides } from '../data/funfantiContent';
import type { ScreenKey } from '../data/funfantiContent';

type IntroFlowProps = {
  screen: ScreenKey;
  activeSlide: number;
  selectedInterest: string;
  interests: string[];
  onSelectInterest: (interest: string) => void;
  onGoToApp: () => void;
  onAdvanceOnboarding: () => void;
  onContinue: () => void;
  onSetScreen: (screen: ScreenKey) => void;
};

export function IntroFlow({
  screen,
  activeSlide,
  selectedInterest,
  interests,
  onSelectInterest,
  onGoToApp,
  onAdvanceOnboarding,
  onContinue,
  onSetScreen,
}: IntroFlowProps) {
  if (screen === 'splash') {
    return (
      <View style={styles.splashScreen}>
        <View style={styles.splashGlowTop} />
        <View style={styles.splashGlowBottom} />
        <View style={styles.splashCenter}>
          <ArtBlock tone={colors.brandGreen} variant="hero" />
          <Text style={styles.splashWordmark}>Funfanti</Text>
          <Text style={styles.splashCaption}>Tiny quizzes. Faster recall. Better habits.</Text>
          <Pressable style={styles.splashButton} onPress={onGoToApp}>
            <Text style={styles.splashButtonText}>Enter app</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (screen === 'interests') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.interestContainer}>
          <ScreenHeader
            title="What interests you?"
            subtitle="Select a learning theme to personalize your feed."
          />
          <View style={styles.interestGrid}>
            {interests.map((interest) => {
              const active = selectedInterest === interest;
              return (
                <Pressable
                  key={interest}
                  style={[styles.interestChip, active && styles.interestChipActive]}
                  onPress={() => onSelectInterest(interest)}
                >
                  <Text style={[styles.interestChipText, active && styles.interestChipTextActive]}>
                    {interest}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Your feed starts with {selectedInterest}</Text>
            <Text style={styles.noteText}>
              We’ll prioritize sets and reminders around your chosen interest for quicker daily
              learning.
            </Text>
          </View>
          <PrimaryButton label="Continue" onPress={onContinue} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const slide = onboardingSlides[activeSlide];

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.onboardingContainer}>
        <View style={styles.heroMark}>
          <ArtBlock tone={colors.brandGreenSoft} variant="hero" />
        </View>
        <View style={styles.dotRow}>
          {onboardingSlides.map((item, index) => (
            <View key={item.key} style={[styles.dot, index === activeSlide && styles.dotActive]} />
          ))}
        </View>
        <Text style={styles.onboardingTitle}>{slide.title}</Text>
        <Text style={styles.onboardingText}>{slide.description}</Text>
        <View style={styles.onboardingActions}>
          <Pressable style={styles.ghostButton} onPress={onGoToApp}>
            <Text style={styles.ghostButtonText}>Skip</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={onAdvanceOnboarding}>
            <Text style={styles.primaryButtonText}>
              {activeSlide === onboardingSlides.length - 1 ? 'Get started' : 'Next'}
            </Text>
          </Pressable>
        </View>
        <View style={styles.onboardingHelperCard}>
          <Text style={styles.helperCardLabel}>What makes Funfanti different</Text>
          <Text style={styles.helperCardText}>
            Questions are short, visual, and designed to feel effortless while still building
            lasting recall.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  splashScreen: {
    flex: 1,
    backgroundColor: colors.brandGreen,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  splashGlowTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -40,
    right: -80,
  },
  splashGlowBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -90,
    left: -100,
  },
  splashCenter: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  splashWordmark: {
    color: '#fffbe7',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginTop: 16,
  },
  splashCaption: {
    color: 'rgba(255,255,255,0.92)',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 320,
  },
  splashButton: {
    marginTop: 24,
    backgroundColor: colors.brand,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
  },
  splashButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
  },
  onboardingContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  heroMark: {
    alignItems: 'center',
    marginBottom: 24,
  },
  dotRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 28,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#c0c7ba',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.brand,
  },
  onboardingTitle: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '800',
    color: colors.text,
  },
  onboardingText: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
    marginTop: 16,
  },
  onboardingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 28,
  },
  ghostButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d8ddd2',
    borderRadius: 999,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  ghostButtonText: {
    color: '#24324a',
    fontWeight: '700',
  },
  onboardingHelperCard: {
    marginTop: 24,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e4e7dd',
  },
  helperCardLabel: {
    color: colors.textSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    fontWeight: '700',
  },
  helperCardText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 15,
  },
  interestContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  interestChip: {
    width: '48%',
    marginHorizontal: '1%',
    backgroundColor: colors.lime,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  interestChipActive: {
    backgroundColor: colors.brand,
  },
  interestChipText: {
    color: '#31404f',
    fontWeight: '700',
    textAlign: 'center',
  },
  interestChipTextActive: {
    color: colors.surface,
  },
  noteCard: {
    marginTop: 18,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e1e6d9',
    marginBottom: 18,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  noteText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
});
