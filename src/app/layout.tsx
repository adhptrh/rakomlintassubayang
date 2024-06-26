import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import { GoogleAnalytics } from "@next/third-parties/google"
import { Notifications } from '@mantine/notifications'
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './layout.css';

export const metadata: Metadata = {
  title: "Rakom Lintas Subayang",
  description: "Website Resmi Rakom Lintas Subayang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favico.ico" type="image/x-icon"></link>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="light">
          <Notifications />
          
          {children}
        </MantineProvider>
      </body>
      <GoogleAnalytics gaId="G-NKJPFGFN2R"/>
    </html>
    );
}
