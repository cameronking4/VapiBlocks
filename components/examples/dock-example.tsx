"use client";

import {
	BlocksIcon,
	CircleIcon,
	HexagonIcon,
	OctagonIcon,
	PentagonIcon,
	SquareIcon,
	TriangleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
	Dock,
	DockCard,
	DockCardInner,
	DockDivider,
} from "@/components/ui/dock";

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const userAgent = navigator.userAgent;
		const isSmall = window.matchMedia("(max-width: 768px)").matches;
		const isMobile = Boolean(
			/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
				userAgent,
			),
		);

		const isDev = process.env.NODE_ENV !== "production";
		if (isDev) setIsMobile(isSmall || isMobile);

		setIsMobile(isSmall && isMobile);
	}, []);

	return isMobile;
}

// Pass array of assistantIds to dock
const assistantIds = [
	"f311b326-bf6f-49c7-b2ca-0d76382bf2fc",
	"1fc9fcc6-55e1-4168-8c38-e351dd434939",
	"8d676299-6ff4-4f87-8dcc-0056a4b1eb9a",
	"41e193b8-920e-4259-b0b6-39b7229d940f",
	null,
	"f13d4b25-aafe-40af-b4be-0d4e2e4258e6",
];
const gradients = [
	"https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
	"https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg",
	"https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
	"https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg",
	null,
	"https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut-p-130x130q80.jpeg",
];

export default function DockAnimation() {
	const openIcons = [
		<CircleIcon
			key="1"
			className="h-8 w-8 rounded-full fill-black stroke-black"
		/>,
		<TriangleIcon
			key="2"
			className="h-8 w-8 rounded-full fill-black stroke-black"
		/>,
		<SquareIcon
			key="3"
			className="h-8 w-8 rounded-full fill-black stroke-black"
		/>,
		<PentagonIcon
			key="4"
			className="h-8 w-8 rounded-full fill-black stroke-black"
		/>,
		null,
		<BlocksIcon
			key="7"
			className="h-8 w-8 rounded-full fill-black stroke-black"
		/>,
	];

	const isMobile = useIsMobile();

	const responsiveOpenIcons = isMobile
		? openIcons.slice(3, openIcons.length)
		: openIcons;
	const responsiveGradients = isMobile
		? gradients.slice(3, gradients.length)
		: gradients;

	return (
		<div
			className="flex items-center justify-center w-full py-8"
			style={{ zIndex: 5, position: "relative" }}
		>
			<Dock>
				{responsiveGradients.map((src, index) =>
					src ? (
						<DockCard
							key={src}
							id={`${index}`}
							assistantId={assistantIds[index] || "default-id"}
						>
							<DockCardInner src={src} id={`${index}`}>
								{responsiveOpenIcons[index]}
							</DockCardInner>
						</DockCard>
					) : (
						<DockDivider key={index} />
					),
				)}
			</Dock>
		</div>
	);
}
