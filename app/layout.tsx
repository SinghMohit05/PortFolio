import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/SinghMohit05"),
  title: "Mohit Singh Chahar | Full-Stack Developer & Cybersecurity Enthusiast",
  description:
    "Personal portfolio of Mohit Singh Chahar, a Full-Stack Developer and Cybersecurity enthusiast specializing in building secure web applications, REST APIs, and modern user interfaces.",
  icons: {
    icon: "/images/M logo.jpg",
    shortcut: "/images/M logo.jpg",
    apple: "/images/M logo.jpg",
  },
  keywords: ["Mohit Singh Chahar", "Full-Stack Developer", "Cybersecurity", "FastAPI", "React", "Next.js", "Python", "Ethical Hacking"],
  authors: [{ name: "Mohit Singh Chahar" }],
  creator: "Mohit Singh Chahar",
  openGraph: {
    title: "Mohit Singh Chahar | Full-Stack Developer & Cybersecurity Enthusiast",
    description:
      "Personal portfolio showcasing full-stack web applications, penetration testing research, skills, and experience.",
    url: "https://github.com/SinghMohit05",
    siteName: "Mohit Singh Chahar Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Singh Chahar | Full-Stack Developer",
    description: "Building scalable, performant, and secure web experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
