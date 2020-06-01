import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppProps } from 'next/app';
import { Container, Form, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar-heatmap/dist/styles.css';

import UsernameInput from '../components/UsernameInput';

import '../styles/heatmap.css';

export default function App({ Component, pageProps, router }: AppProps) {
    let id = router.query.id as string;
    const [username, setUsername] = useState(id);
    const onSubmit = () => router.push(`/users/${username}`);
    const onChange = (val: string) => setUsername(val);
    useEffect(() => setUsername(id === undefined ? "" : id), [id]);
    return (
        <>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Link href="/">
                    <Navbar.Brand href="/">Twitter User Heatmap</Navbar.Brand>
                </Link>
            </Navbar>
            <Container>
                <Form className="mt-4" onSubmit={onSubmit}>
                    <Form.Group>
                        <UsernameInput value={username} onChange={onChange} />
                    </Form.Group>
                </Form>
                <Component {...pageProps} />
            </Container>
        </>
    );
}
