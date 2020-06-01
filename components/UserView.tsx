import { Image, Row, Col } from 'react-bootstrap';

import { HeatmapPixel } from '../lib/twitter';
import Heatmap from './Heatmap';
import UserDataView from './NofTweetsView';

export interface UserData {
    id: string,
    name: string,
    average: number,
    whole_average: number,
    icon_link: string,
    heatmap: HeatmapPixel[],
}
export default function(props: UserData) {
    return (
        <>
            <div className="text-center">
                <Image width="128em" src={props.icon_link} roundedCircle />
                <h1 className="mt-2">{props.name}</h1>
            </div>
            <Row className="my-4">
                <Col>
                    <UserDataView title="期間平均" data={props.average} />
                </Col>
                <Col>
                    <UserDataView title="全体平均" data={props.whole_average} />
                </Col>
            </Row>
            <Heatmap heatmap={props.heatmap} />
        </>
    );
}
