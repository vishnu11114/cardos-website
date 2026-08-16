import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cardos.in';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'CardOS — India’s Credit Card Operating System',
    template: '%s | CardOS India',
  },
  description:
    'The intelligence layer for Indian credit cards. Calculate 5x Gyftr multipliers, instant bank sale discounts, airport lounge access caps, and fee waiver targets with verified T&C evidence.',
  keywords: [
    'Credit Card OS India',
    'HDFC Infinia Metal',
    'Axis Magnus',
    'SBI Cashback Card',
    'ICICI Emeralde',
    'Amex Platinum India',
    'SmartBuy 5x Points',
    'Gyftr Multipliers',
    'Indian Credit Card Offers',
  ],
  authors: [{ name: 'Credit Card OS Engineering Team' }],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'CardOS — Credit Card Operating System',
    description: 'Calculate, explain, and verify credit card reward yields, merchant offers, and lounge benefits across 14 top Indian credit cards.',
    url: baseUrl,
    siteName: 'Credit Card OS',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CardOS — Credit Card Operating System',
    description: 'Calculate 5x Gyftr multipliers, instant bank discounts, and inspect verified T&C evidence.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var attrs = ['bis_skin_checked', 'bis_register', 'data-bis-ignore', '__processed_bis__'];
                  var clean = function(root) {
                    if (!root || !root.querySelectorAll) return;
                    for (var i = 0; i < attrs.length; i++) {
                      var a = attrs[i];
                      if (root.hasAttribute && root.hasAttribute(a)) root.removeAttribute(a);
                      var list = root.querySelectorAll('[' + a + ']');
                      for (var j = 0; j < list.length; j++) {
                        list[j].removeAttribute(a);
                      }
                    }
                  };
                  clean(document);
                  if (typeof MutationObserver !== 'undefined') {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes' && attrs.indexOf(m.attributeName) !== -1) {
                          m.target.removeAttribute(m.attributeName);
                        }
                      }
                    });
                    observer.observe(document.documentElement || document, {
                      attributes: true,
                      subtree: true,
                      attributeFilter: attrs,
                    });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-[#FFFFFF] text-[#1D1D1F] font-sans selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]"
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
