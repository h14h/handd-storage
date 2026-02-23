"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import type { Appearance } from "@clerk/types";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const font = '"JetBrains Mono", "Courier New", monospace';

const clerkAppearance: Appearance = {
	variables: {
		colorPrimary: "#8B7500",
		colorBackground: "#FFF",
		colorText: "#000",
		colorTextOnPrimaryBackground: "#000",
		colorTextSecondary: "#333",
		colorInputBackground: "#FFF",
		colorInputText: "#000",
		colorDanger: "#FF0000",
		fontFamily: font,
		borderRadius: "0px",
	},
	elements: {
		card: {
			border: "3px solid #000",
			borderRadius: "0",
			boxShadow: "4px 4px 0px #000",
		},
		headerTitle: {
			fontWeight: 800,
			letterSpacing: "0.2em",
			textTransform: "uppercase" as const,
		},
		headerSubtitle: {
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			fontSize: "0.625rem",
		},
		socialButtonsBlockButton: {
			border: "3px solid #000",
			borderRadius: "0",
			fontWeight: 700,
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			transition: "all 100ms",
		},
		socialButtonsBlockButtonText: {
			fontWeight: 700,
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
		},
		dividerLine: {
			borderColor: "#000",
		},
		dividerText: {
			color: "#000",
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			fontSize: "0.625rem",
			fontWeight: 800,
		},
		formFieldInput: {
			border: "3px solid #000",
			borderRadius: "0",
			fontSize: "0.875rem",
			letterSpacing: "0.05em",
		},
		formFieldLabel: {
			fontWeight: 700,
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			fontSize: "0.625rem",
		},
		formButtonPrimary: {
			backgroundColor: "#000",
			color: "#FFF",
			border: "3px solid #000",
			borderRadius: "0",
			fontWeight: 800,
			letterSpacing: "0.2em",
			textTransform: "uppercase" as const,
			transition: "all 100ms",
			boxShadow: "none",
		},
		footerActionLink: {
			color: "#000",
			fontWeight: 700,
			letterSpacing: "0.1em",
			textDecoration: "underline",
			textUnderlineOffset: "3px",
		},
		footerActionText: {
			letterSpacing: "0.1em",
		},
		userButtonAvatarBox: {
			border: "3px solid #000",
			borderRadius: "0",
			width: "32px",
			height: "32px",
		},
		avatarImage: {
			borderRadius: "0",
		},
		userButtonPopoverCard: {
			border: "3px solid #000",
			borderRadius: "0",
			boxShadow: "4px 4px 0px #000",
		},
		userButtonPopoverActionButton: {
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			fontWeight: 700,
			fontSize: "0.75rem",
			borderRadius: "0",
		},
		userButtonPopoverActionButtonText: {
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			fontWeight: 700,
		},
		userButtonPopoverActionButtonIcon: {
			color: "#000",
		},
		userButtonPopoverFooter: {
			display: "none",
		},
		navbarButton: {
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			fontWeight: 700,
			borderRadius: "0",
		},
		profileSectionTitle: {
			fontWeight: 800,
			letterSpacing: "0.2em",
			textTransform: "uppercase" as const,
		},
		profileSectionPrimaryButton: {
			borderRadius: "0",
			fontWeight: 700,
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
		},
		badge: {
			borderRadius: "0",
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
			fontWeight: 700,
		},
		formFieldInputShowPasswordButton: {
			borderRadius: "0",
		},
		otpCodeFieldInput: {
			border: "3px solid #000",
			borderRadius: "0",
		},
		alternativeMethodsBlockButton: {
			border: "3px solid #000",
			borderRadius: "0",
			fontWeight: 700,
			letterSpacing: "0.15em",
			textTransform: "uppercase" as const,
		},
		identityPreview: {
			border: "3px solid #000",
			borderRadius: "0",
		},
		identityPreviewText: {
			letterSpacing: "0.1em",
		},
		identityPreviewEditButton: {
			letterSpacing: "0.15em",
			fontWeight: 700,
		},
	},
};

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider appearance={clerkAppearance}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
