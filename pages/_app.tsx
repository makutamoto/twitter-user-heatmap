import { AppProps } from 'next/app';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar-heatmap/dist/styles.css';

import '../styles/heatmap.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Navbar.Brand>Twitter User Heatmap</Navbar.Brand>
            </Navbar>
            <Container>
                <Component {...pageProps} />
            </Container>
        </>
    );
}
