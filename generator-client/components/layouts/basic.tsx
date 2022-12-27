import Navbar from '../navbar';
import Footer from '../footer';

export default function BasicLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
