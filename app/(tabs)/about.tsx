import React from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

// Elegant color palette
const colors = {
	primary: "#6366f1",
	primaryLight: "#818cf8",
	primaryDark: "#4f46e5",
	secondary: "#f59e0b",
	background: "#0f172a",
	surface: "#1e293b",
	surfaceLight: "#334155",
	text: "#f8fafc",
	textSecondary: "#cbd5e1",
	textMuted: "#64748b",
	success: "#10b981",
	error: "#ef4444",
	border: "#334155",
	white: "#ffffff",
	black: "#000000",
};

// Typography scale
const typography = {
	h1: { fontSize: 32, fontWeight: "700" as const },
	h2: { fontSize: 28, fontWeight: "600" as const },
	h3: { fontSize: 24, fontWeight: "600" as const },
	body: { fontSize: 16, fontWeight: "400" as const },
	bodyBold: { fontSize: 16, fontWeight: "600" as const },
	caption: { fontSize: 14, fontWeight: "400" as const },
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

export default function CreatePostScreen() {
	const router = useRouter();

	const handleAddPerson = () => {
		router.push("/forms/person/name");
	};

	const handleAddDate = () => {
		router.push("/forms/date/select-person");
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<View style={styles.headerSection}>
				<Text style={styles.header}>Create New</Text>
				<Text style={styles.subtitle}>
					Add people to your collection or record your dating experiences
				</Text>
			</View>

			<View style={styles.actionsContainer}>
				<TouchableOpacity
					style={[styles.button, styles.primaryButton]}
					onPress={handleAddPerson}
				>
					<Text style={styles.buttonText}>Add a Person</Text>
					<Text style={styles.buttonSubtext}>
						Add someone new to your collection
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.secondaryButton]}
					onPress={handleAddDate}
				>
					<Text style={styles.secondaryButtonText}>Add a Date</Text>
					<Text style={styles.buttonSubtext}>Record a date with someone</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.infoSection}>
				<Text style={styles.infoTitle}>How it works</Text>
				<View style={styles.infoCard}>
					<Text style={styles.infoStep}>1. Add People</Text>
					<Text style={styles.infoDescription}>
						Start by adding people to your collection with their basic details
					</Text>
				</View>
				<View style={styles.infoCard}>
					<Text style={styles.infoStep}>2. Add Dates</Text>
					<Text style={styles.infoDescription}>
						Then record your dates with those people, including activities and
						ratings
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	contentContainer: {
		padding: spacing.lg,
		paddingBottom: spacing.xxl,
	},
	headerSection: {
		alignItems: "center",
		marginBottom: spacing.xxl,
		marginTop: spacing.xl,
	},
	header: {
		...typography.h1,
		color: colors.text,
		marginBottom: spacing.sm,
		textAlign: "center",
		letterSpacing: -1,
	},
	subtitle: {
		...typography.body,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 24,
		paddingHorizontal: spacing.md,
	},
	actionsContainer: {
		marginBottom: spacing.xxl,
	},
	button: {
		paddingVertical: spacing.lg,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.lg,
		alignItems: "center",
		marginBottom: spacing.lg,
		minHeight: 80,
		justifyContent: "center",
	},
	primaryButton: {
		backgroundColor: colors.primary,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	secondaryButton: {
		backgroundColor: colors.success,
		shadowColor: colors.success,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	buttonText: {
		color: colors.white,
		fontSize: typography.h3.fontSize,
		fontWeight: typography.h3.fontWeight,
		letterSpacing: 0.5,
		marginBottom: spacing.xs,
	},
	secondaryButtonText: {
		color: colors.white,
		fontSize: typography.h3.fontSize,
		fontWeight: typography.h3.fontWeight,
		letterSpacing: 0.5,
		marginBottom: spacing.xs,
	},
	buttonSubtext: {
		color: colors.textSecondary,
		fontSize: typography.caption.fontSize,
		textAlign: "center",
		opacity: 0.8,
	},
	infoSection: {
		marginBottom: spacing.lg,
	},
	infoTitle: {
		...typography.h3,
		color: colors.text,
		marginBottom: spacing.lg,
		textAlign: "center",
	},
	infoCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.md,
		borderWidth: 1,
		borderColor: colors.border,
	},
	infoStep: {
		...typography.bodyBold,
		color: colors.primary,
		marginBottom: spacing.xs,
	},
	infoDescription: {
		...typography.body,
		color: colors.textSecondary,
		lineHeight: 22,
	},
});
