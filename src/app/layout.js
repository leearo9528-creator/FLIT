import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import BottomTab from "@/components/ui/BottomTab";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: '플릿(FLIT) - 셀러들이 말하는 진짜 행사 정보',
        template: '%s',
    },
    description: '플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼. 실제 셀러 리뷰, 모집공고, 주최사 정보를 한눈에 확인하세요.',
    keywords: ['플리마켓', '팝업스토어', '셀러', '행사정보', '모집공고', '플릿', 'FLIT'],
    authors: [{ name: '플릿(FLIT)' }],
    creator: '플릿(FLIT)',
    metadataBase: new URL('https://flitunion.vercel.app'),
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        siteName: '플릿(FLIT)',
        title: '플릿(FLIT) - 셀러들이 말하는 진짜 행사 정보',
        description: '플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
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
