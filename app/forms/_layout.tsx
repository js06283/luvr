import React from "react";
import { Stack } from "expo-router";
import { FormProvider } from "./FormContext";

export default function FormsLayout() {
	return (
		<FormProvider>
			<Stack>
				<Stack.Screen
					name="date"
					options={{
						title: "Date",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="activity-location-time"
					options={{
						title: "Activity Location Time",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="name"
					options={{
						title: "Name",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="age"
					options={{
						title: "Age",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="height"
					options={{
						title: "Height",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="industry"
					options={{
						title: "Industry",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="hair-color"
					options={{
						title: "Hair Color",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="eye-color"
					options={{
						title: "Eye Color",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="how-we-met"
					options={{
						title: "How We Met",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="activity"
					options={{
						title: "Activity",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="rating"
					options={{
						title: "Rating",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="emoji"
					options={{
						title: "Emoji",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="icks"
					options={{
						title: "Icks",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="liked"
					options={{
						title: "Liked",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="mutuals"
					options={{
						title: "Mutuals",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="review"
					options={{
						title: "Review",
						headerShown: false,
					}}
				/>
			</Stack>
		</FormProvider>
	);
}
