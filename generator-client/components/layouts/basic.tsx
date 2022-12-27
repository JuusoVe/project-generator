import Navbar from '../Navbar';
import Footer from '../Footer';
import { Container } from '@mui/system';

export default function BasicLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <Navbar />
            <Container>
                <main>{children}</main>
            </Container>
            <Footer />
        </>
    );
}
