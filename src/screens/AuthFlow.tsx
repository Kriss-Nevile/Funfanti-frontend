import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ArtBlock } from '../components/ArtBlock';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';

type AuthFlowProps = {
  screen: 'auth-select' | 'register' | 'login' | 'auth-success';
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  registerName: string;
  onChangeLoginEmail: (value: string) => void;
  onChangeLoginPassword: (value: string) => void;
  onChangeRegisterEmail: (value: string) => void;
  onChangeRegisterPassword: (value: string) => void;
  onChangeRegisterName: (value: string) => void;
  onBackToIntro: () => void;
  onGoToLogin: () => void;
  onGoToRegister: () => void;
  onSubmitRegister: () => void;
  onSubmitLogin: () => void;
  onCompleteSuccess: () => void;
};

export function AuthFlow({
  screen,
  loginEmail,
  loginPassword,
  registerEmail,
  registerPassword,
  registerName,
  onChangeLoginEmail,
  onChangeLoginPassword,
  onChangeRegisterEmail,
  onChangeRegisterPassword,
  onChangeRegisterName,
  onBackToIntro,
  onGoToLogin,
  onGoToRegister,
  onSubmitRegister,
  onSubmitLogin,
  onCompleteSuccess,
}: AuthFlowProps) {
  if (screen === 'auth-success') {
    return (
      <View style={styles.successScreen}>
        <View style={styles.successCircle}>
          <Text style={styles.successCheck}>✓</Text>
        </View>
        <Text style={styles.successTitle}>You're All Set!</Text>
        <Pressable style={styles.successButton} onPress={onCompleteSuccess}>
          <Text style={styles.successButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  if (screen === 'register') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Pressable onPress={onBackToIntro}>
            <Text style={styles.backLabel}>‹ Back</Text>
          </Pressable>
          <View style={styles.brandArt}>
            <ArtBlock tone={colors.brandGreenSoft} variant="card" />
          </View>
          <Text style={styles.formTitle}>Create your account</Text>
          <TextInput
            style={styles.input}
            value={registerEmail}
            onChangeText={onChangeRegisterEmail}
            placeholder="Email address"
            placeholderTextColor="#7d7d7d"
          />
          <TextInput
            style={styles.input}
            value={registerName}
            onChangeText={onChangeRegisterName}
            placeholder="Full name"
            placeholderTextColor="#7d7d7d"
          />
          <TextInput
            style={styles.input}
            value={registerPassword}
            onChangeText={onChangeRegisterPassword}
            placeholder="Password"
            placeholderTextColor="#7d7d7d"
            secureTextEntry
          />
          <PrimaryButton label="Create Account" onPress={onSubmitRegister} />
          <Text style={styles.legalText}>
            By tapping Create Account you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'login') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Pressable onPress={onBackToIntro}>
            <Text style={styles.backLabel}>‹ Back</Text>
          </Pressable>
          <View style={styles.brandArt}>
            <ArtBlock tone={colors.mint} variant="card" />
          </View>
          <Text style={styles.formTitle}>Login to your account</Text>
          <TextInput
            style={styles.input}
            value={loginEmail}
            onChangeText={onChangeLoginEmail}
            placeholder="Email address"
            placeholderTextColor="#7d7d7d"
          />
          <TextInput
            style={styles.input}
            value={loginPassword}
            onChangeText={onChangeLoginPassword}
            placeholder="Password"
            placeholderTextColor="#7d7d7d"
            secureTextEntry
          />
          <PrimaryButton label="Login" onPress={onSubmitLogin} />
          <Pressable style={styles.secondaryLink} onPress={onGoToRegister}>
            <Text style={styles.secondaryLinkText}>Forget Password</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.authContainer}>
        <View style={styles.authBadge}>
          <ArtBlock tone={colors.brandGreen} variant="hero" />
        </View>
        <Text style={styles.authTitle}>Create Account</Text>
        <Text style={styles.authText}>Choose a fast path to get into your learning flow.</Text>
        <View style={styles.authButtonStack}>
          <Pressable style={styles.outlineButton} onPress={onGoToRegister}>
            <Text style={styles.outlineButtonText}>Register with E-mail or Phone number</Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={onGoToRegister}>
            <Text style={styles.outlineButtonText}>Register with Google</Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={onGoToRegister}>
            <Text style={styles.outlineButtonText}>Register with Apple</Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={onGoToRegister}>
            <Text style={styles.outlineButtonText}>Register with Facebook</Text>
          </Pressable>
        </View>
        <View style={styles.linkRow}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <Pressable onPress={onGoToLogin}>
            <Text style={styles.linkAction}>Login</Text>
          </Pressable>
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
  authContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  authBadge: {
    alignItems: 'center',
    marginBottom: 18,
  },
  authTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: colors.text,
  },
  authText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 10,
    marginBottom: 22,
    lineHeight: 22,
  },
  authButtonStack: {
    gap: 10,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#282828',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  linkText: {
    color: colors.textMuted,
    marginRight: 6,
  },
  linkAction: {
    color: colors.brand,
    fontWeight: '800',
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  backLabel: {
    color: '#19263a',
    marginBottom: 16,
    fontSize: 15,
    fontWeight: '700',
  },
  brandArt: {
    marginBottom: 16,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#b5bdd5',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 15,
    color: colors.text,
  },
  legalText: {
    marginTop: 18,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    textAlign: 'center',
  },
  secondaryLink: {
    marginTop: 14,
    alignItems: 'center',
  },
  secondaryLinkText: {
    color: colors.brand,
    fontWeight: '800',
  },
  successScreen: {
    flex: 1,
    backgroundColor: colors.brandGreen,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successCheck: {
    color: colors.surface,
    fontSize: 40,
    fontWeight: '900',
  },
  successTitle: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  successButton: {
    marginTop: 22,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  successButtonText: {
    color: colors.brand,
    fontWeight: '900',
  },
});
