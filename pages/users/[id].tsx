import { useState } from 'react';
import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { Form, Alert } from 'react-bootstrap';

import { User } from '../../lib/twitter';
import UsernameInput from '../../components/UsernameInput';
import UserView, { UserData } from '../../components/UserView';

export interface IDProps {
    id: string,
    data: UserData | null,
}
export default function (props: IDProps) {
    const [username, setUsername] = useState(props.id);
    const onSubmit = () => Router.push(`/users/${username}`);
    const onChange = (val: string) => setUsername(val);
    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <UsernameInput value={username} onChange={onChange} />
                </Form.Group>
            </Form>
            {props.data === null ?
                <Alert variant="danger">User not found!</Alert> 
                :
                <UserView {...props.data} />
            }
        </>
    );
}

export async function getServerSideProps(props: GetServerSidePropsContext) {
    let id = props.params!.id as string;
    try {
        let user = new User(id);
        let heatmap = await user.getTweetHeatmapAndAverage();
        let icon_link = await user.getUserIcon();
        icon_link = icon_link.substr(0, icon_link.length - 10) + "400x400.jpg"
        return {
            props: {
                id,
                data: {
                    id,
                    heatmap: heatmap.heatmap,
                    icon_link,
                },
            },
        };
    } catch(_) {
        return {
            props: {
                id,
                data: null,
            }
        }
    }
}
