import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "الاتصالات في الكويت ",
  description:
    "استكشف عالم الاتصالات المتطور في دولة الكويت مع أحدث التقنيات والخدمات الرقمية المبتكرة الدفع السريع والشحن",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        {/* Inspectlet Analytics Script */}
        <Script
          id="inspectlet-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.__insp = window.__insp || [];
                __insp.push(['wid', 963572838]);
                var ldinsp = function(){
                  if(typeof window.__inspld != "undefined") return; 
                  window.__inspld = 1; 
                  var insp = document.createElement('script'); 
                  insp.type = 'text/javascript'; 
                  insp.async = true; 
                  insp.id = "inspsync"; 
                  insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=963572838&r=' + Math.floor(new Date().getTime()/3600000); 
                  var x = document.getElementsByTagName('script')[0]; 
                  x.parentNode.insertBefore(insp, x); 
                };
                setTimeout(ldinsp, 0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
