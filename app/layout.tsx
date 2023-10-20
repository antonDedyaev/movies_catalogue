import "@/styles/main.scss";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Providers } from "@/redux/provider";

const dmSans = DM_Sans({
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Movies Catalogue",
	description: "Test Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ru'>
			<body className={dmSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
