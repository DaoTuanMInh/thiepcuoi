import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://thiepcuoi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Thiệp Cưới Xuân Tùng & Thuý Hiền",
  description: "Thiệp cưới trực tuyến - Phạm Xuân Tùng & Nguyễn Thuý Hiền",
  openGraph: {
    title: "Thiệp Cưới Xuân Tùng & Thuý Hiền",
    description: "Thiệp cưới trực tuyến - Phạm Xuân Tùng & Nguyễn Thuý Hiền",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/images/og-wedding-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Thiệp Cưới Xuân Tùng & Thuý Hiền",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp Cưới Xuân Tùng & Thuý Hiền",
    description: "Thiệp cưới trực tuyến - Phạm Xuân Tùng & Nguyễn Thuý Hiền",
    images: ["/images/og-wedding-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                // Force manual scroll restoration & scroll to top immediately on page load / reload
                try {
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  window.scrollTo(0, 0);
                  if (document.documentElement) document.documentElement.scrollTop = 0;
                  if (document.body) document.body.scrollTop = 0;
                } catch (e) {}

                window.addEventListener('beforeunload', function() {
                  try {
                    window.scrollTo(0, 0);
                  } catch (e) {}
                });

                // Suppress browser extension hydration mismatch errors (e.g. Bitdefender bis_skin_checked)
                const origError = console.error;
                console.error = function(...args) {
                  for (let i = 0; i < args.length; i++) {
                    const arg = args[i];
                    if (typeof arg === 'string' && (arg.indexOf('bis_skin_checked') !== -1 || arg.indexOf('bis_frame_id') !== -1 || arg.indexOf('bis_register') !== -1)) {
                      return;
                    }
                  }
                  origError.apply(console, args);
                };

                // Observer to strip extension attributes
                if (typeof MutationObserver !== 'undefined') {
                  const observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && m.attributeName && m.attributeName.indexOf('bis_') === 0) {
                        m.target.removeAttribute(m.attributeName);
                      }
                    }
                  });
                  if (document.documentElement) {
                    observer.observe(document.documentElement, { attributes: true, subtree: true });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
