import React from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { formStyles } from "../forms/FormStyles";

// Import colors and typography from FormStyles
const colors = {
	background: "#FFFBF8", // A warm off-white
	text: "#1E1E1E", // Dark charcoal
	primary: "#D8D1E9", // Light Lavender
	secondary: "#F5A895", // Coral/Salmon Pink
	accent: "#8E9AAF", // Slate Blue/Gray
	white: "#ffffff",
	textSecondary: "#8E9AAF", // Using accent for secondary text
	textMuted: "#B0B8C4", // A lighter gray for placeholders
	border: "#EAEAEA", // A light gray for borders
	surface: "#ffffff", // White surface
	success: "#10b981", // Emerald
};

const typography = {
	h1: { fontSize: 32, fontWeight: "700" as const },
	h2: { fontSize: 28, fontWeight: "600" as const },
	h3: { fontSize: 24, fontWeight: "600" as const },
	body: { fontSize: 16, fontWeight: "400" as const },
	bodyBold: { fontSize: 16, fontWeight: "600" as const },
	caption: { fontSize: 14, fontWeight: "400" as const },
};

const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
};

const borderRadius = {
	sm: 6,
	md: 12,
	lg: 16,
	xl: 24,
	full: 9999,
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
				<TouchableOpacity onPress={handleAddPerson} style={styles.button}>
					<Text style={styles.buttonText}>Add a Person</Text>
					<Text style={styles.buttonSubtext}>
						Add someone new to your collection
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={handleAddDate}
					style={styles.buttonSecondary}
				>
					<Text style={styles.buttonText}>Add a Date</Text>
					<Text style={styles.buttonSubtext}>Record a date with someone</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.infoSection}>
				<Text style={styles.infoTitle}>How it works</Text>
				<View style={styles.infoCard}>
					<Text style={styles.infoStep}>1. Add People</Text>
					<Text style={styles.infoDescription}>
						Start by adding people to your collection with their basic details
						(name, age, occupation)
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
		marginBottom: spacing.xl,
	},
	header: {
		...typography.h2,
		color: colors.text,
		textAlign: "center",
		marginBottom: spacing.sm,
		letterSpacing: -0.5,
	},
	subtitle: {
		...typography.body,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 24,
	},
	actionsContainer: {
		gap: spacing.lg,
		marginBottom: spacing.xl,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
		alignItems: "center",
		minHeight: 80,
		justifyContent: "center",
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	buttonSecondary: {
		backgroundColor: colors.secondary,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
		alignItems: "center",
		minHeight: 80,
		justifyContent: "center",
		shadowColor: colors.secondary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	buttonText: {
		color: colors.white,
		fontSize: typography.bodyBold.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
		letterSpacing: 0.5,
		marginBottom: spacing.xs,
	},
	buttonSubtext: {
		color: colors.white,
		fontSize: typography.caption.fontSize,
		opacity: 0.9,
		textAlign: "center",
	},
	infoSection: {
		marginTop: spacing.xl,
	},
	infoTitle: {
		...typography.h3,
		color: colors.text,
		marginBottom: spacing.lg,
		textAlign: "center",
	},
	infoCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.md,
		padding: spacing.lg,
		marginBottom: spacing.md,
		borderWidth: 1,
		borderColor: colors.border,
	},
	infoStep: {
		...typography.bodyBold,
		color: colors.text,
		marginBottom: spacing.sm,
	},
	infoDescription: {
		...typography.body,
		color: colors.textSecondary,
		lineHeight: 24,
	},
});
