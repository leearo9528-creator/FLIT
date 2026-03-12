import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import BottomTab from "@/components/ui/BottomTab";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "플리 (Flea)",
    description: "셀러들이 말하는 진짜 행사 정보",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                    <BottomTab />
                </AuthProvider>
            </body>
        </html>
    );
}
