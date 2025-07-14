import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../firebaseConfig';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// New color palette from the design
const colors = {
  background: '#FFFBF8', // A warm off-white
  text: '#1E1E1E', // Dark charcoal
  primary: '#D8D1E9', // Light Lavender
  secondary: '#F5A895', // Coral/Salmon Pink
  accent: '#8E9AAF', // Slate Blue/Gray
  white: '#ffffff',
  textSecondary: '#8E9AAF', // Using accent for secondary text
  textMuted: '#B0B8C4', // A lighter gray for placeholders
  border: '#EAEAEA', // A light gray for borders
  error: '#E57373', // A soft red for errors
};

// Typography scale (consistent with other screens)
const typography = {
  h1: { fontSize: 48, fontWeight: '700' as const },
  h2: { fontSize: 28, fontWeight: '600' as const },
  h3: { fontSize: 22, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyBold: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 14, fontWeight: '400' as const },
};

// Spacing scale
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const auth = getAuth(app);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Logged in successfully!');
      }
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'An error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* App Logo/Title */}
          <View style={styles.logoContainer}>
            <Text style={styles.appTitle}>lolo</Text>
            <Text style={styles.appSubtitle}>Designed to Delight.</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.subtitle}>
              {isSignUp
                ? 'Join our community and start sharing.'
                : 'Sign in to continue your journey.'}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity onPress={handleAuth} disabled={isLoading}>
              <LinearGradient
                colors={
                  isLoading
                    ? [colors.accent, colors.textMuted]
                    : [colors.primary, colors.secondary]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {isLoading
                    ? 'Please wait...'
                    : isSignUp
                      ? 'Create Account'
                      : 'Sign In'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              style={styles.switchButton}
            >
              <Text style={styles.switchText}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appTitle: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
    fontFamily: 'System', // Assuming a nice system font, can be replaced with a custom one
  },
  appSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    marginTop: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.body.fontSize,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    ...typography.bodyBold,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  switchButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  switchText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
  },
});
