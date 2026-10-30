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

export const metadata: Metadata = {
  title: "Thiệp Cưới Linh & Nga",
  description: "Thiệp cưới trực tuyến - Trần Tùng Linh & Lê Hằng Nga",
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
