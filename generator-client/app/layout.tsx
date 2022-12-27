'use client';

import { Container } from '@mui/material';
import Footer from './Footer';
import Navbar from './Navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <Container>
                    <main>{children}</main>
                </Container>
                <Footer />
            </body>
        </html>
    );
}
