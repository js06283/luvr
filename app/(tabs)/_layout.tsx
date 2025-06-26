import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

// New color palette from the design
const colors = {
	background: "#FFFBF8", // A warm off-white
	text: "#1E1E1E", // Dark charcoal
	primary: "#D8D1E9", // Light Lavender
	secondary: "#F5A895", // Coral/Salmon Pink
	accent: "#8E9AAF", // Slate Blue/Gray
	white: "#ffffff",
	textMuted: "#8E9AAF", // Using accent for muted text
	border: "#EAEAEA", // A light gray for borders
};

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.secondary,
				tabBarInactiveTintColor: colors.textMuted,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerShadowVisible: false,
				headerTintColor: colors.text,
				headerTitleStyle: {
					fontWeight: "600",
					fontSize: 20,
				},
				tabBarStyle: {
					backgroundColor: colors.white,
					borderTopWidth: 1,
					borderTopColor: colors.border,
					paddingBottom: 8,
					paddingTop: 8,
					height: 88,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.05,
					shadowRadius: 6,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "500",
					marginTop: 4,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "home-sharp" : "home-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: "Create Post",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "add-circle" : "add-circle-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
