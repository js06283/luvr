import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "./FormContext";
import { formStyles } from "./FormStyles";

export default function EmojiPage() {
	const router = useRouter();
	const { formData, updateFormData } = useFormData();
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const emojiOptions = [
		"😊",
		"😍",
		"😎",
		"😄",
		"😌",
		"😉",
		"😋",
		"😇",
		"🥰",
		"😘",
		"😗",
		"😙",
		"😚",
		"🙂",
		"🤗",
		"🤩",
		"😏",
		"😒",
		"😞",
		"😔",
		"😟",
		"😕",
		"🙁",
		"☹️",
		"😣",
		"😖",
		"😫",
		"😩",
		"🥺",
		"😢",
		"😭",
		"😤",
		"😠",
		"😡",
		"🤬",
		"🤯",
		"😳",
		"🥵",
		"🥶",
		"😱",
		"😨",
		"😰",
		"😥",
		"😓",
		"🤗",
		"🤔",
		"🤭",
		"🤫",
		"🤥",
		"😶",
		"😐",
		"😑",
		"😬",
		"🙄",
		"😯",
		"😦",
		"😧",
		"😮",
		"😲",
		"🥱",
		"😴",
		"🤤",
		"😪",
		"😵",
	];

	const handleNext = () => {
		if (formData.emoji.trim()) {
			router.push("/forms/icks");
		}
	};

	const handleBack = () => {
		router.back();
	};

	const handleReturnToHome = () => {
		router.push("/(tabs)");
	};

	const selectEmoji = (emoji: string) => {
		updateFormData("emoji", emoji);
		setShowEmojiPicker(false);
	};

	return (
		<ScrollView
			style={formStyles.container}
			contentContainerStyle={formStyles.contentContainer}
		>
			<View style={formStyles.progressContainer}>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>1</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>2</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>3</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>4</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>5</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>6</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>7</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>8</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>9</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>10</Text>
				</View>
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>11</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>12</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>13</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>14</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>15</Text>
				</View>
			</View>

			<Text style={formStyles.header}>Choose an emoji that describes them</Text>

			<TouchableOpacity
				style={formStyles.input}
				onPress={() => setShowEmojiPicker(true)}
			>
				<Text style={{ color: formData.emoji ? "#000" : "#666", fontSize: 20 }}>
					{formData.emoji || "Select Emoji"}
				</Text>
			</TouchableOpacity>

			{showEmojiPicker && (
				<View style={formStyles.emojiContainer}>
					{emojiOptions.map((emoji) => (
						<TouchableOpacity
							key={emoji}
							style={[
								formStyles.emojiOption,
								formData.emoji === emoji && formStyles.selectedEmoji,
							]}
							onPress={() => selectEmoji(emoji)}
						>
							<Text style={formStyles.emojiText}>{emoji}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					!formData.emoji.trim() && { backgroundColor: "#ccc" },
				]}
				onPress={handleNext}
				disabled={!formData.emoji.trim()}
			>
				<Text style={formStyles.nextButtonText}>Next</Text>
			</TouchableOpacity>

			<TouchableOpacity style={formStyles.backButton} onPress={handleBack}>
				<Text style={formStyles.backButtonText}>Back</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[formStyles.backButton, { backgroundColor: "#ff6b6b" }]}
				onPress={handleReturnToHome}
			>
				<Text style={formStyles.backButtonText}>Return to Home</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
