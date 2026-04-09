import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import BottomTab from "@/components/ui/BottomTab";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: '플릿 (FLIT) — 셀러들이 말하는 진짜 행사 정보',
        template: '%s | 플릿 (FLIT)',
    },
    description: '플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼. 모집공고, 셀러 리뷰, 주최사 정보를 한 곳에서.',
    keywords: ['플리마켓', '팝업스토어', '셀러', '행사', '모집공고', '플릿', 'FLIT'],
    authors: [{ name: 'FLIT' }],
    creator: 'FLIT',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://app.flitunion.com'),
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://app.flitunion.com',
        siteName: '플릿 (FLIT)',
        title: '플릿 (FLIT) — 셀러들이 말하는 진짜 행사 정보',
        description: '플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼. 모집공고, 셀러 리뷰, 주최사 정보를 한 곳에서.',
    },
    twitter: {
        card: 'summary_large_image',
        title: '플릿 (FLIT)',
        description: '셀러들이 말하는 진짜 행사 정보',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
