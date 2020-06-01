import { GetServerSidePropsContext } from 'next';
import { Alert } from 'react-bootstrap';

import { User } from '../../lib/twitter';
import UserView, { UserData } from '../../components/UserView';

export interface IDProps {
    id: string,
    data: UserData | null,
}
export default function (props: IDProps) {
    return (
        <>
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
        let name = await user.getUserName();
        let icon_link = await user.getUserIcon();
        let whole_average = await user.getWholeAverageNofTweets();
        icon_link = icon_link.substr(0, icon_link.length - 10) + "400x400.jpg"
        return {
            props: {
                id,
                data: {
                    id,
                    name,
                    average: heatmap.average,
                    whole_average,
                    heatmap: heatmap.heatmap,
                    icon_link,
                },
            },
        };
    } catch(e) {
        console.error(e);
        return {
            props: {
                id,
                data: null,
            }
        }
    }
}
