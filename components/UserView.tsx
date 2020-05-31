import { Image } from 'react-bootstrap';

import { HeatmapPixel } from '../lib/twitter';
import Heatmap from './Heatmap';

export interface UserData {
    id: string,
    icon_link: string,
    heatmap: HeatmapPixel[],
}
export default function(props: UserData) {
    return (
        <>
            <Image width="128em" src={props.icon_link} roundedCircle />
            <Heatmap heatmap={props.heatmap} />
        </>
    );
}
