import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

import { HeatmapPixel } from '../lib/twitter';

export interface HeatmapProps {
    heatmap: HeatmapPixel[],
}
export default function(props: HeatmapProps) {
    return (
        <>
            <CalendarHeatmap
                values={props.heatmap}
                classForValue={(value: HeatmapPixel | undefined) => {
                    if(!value) {
                        return 'color-empty';
                    }
                    return `color-scale-${Math.min(4, value.count)}`;
                }}
                tooltipDataAttrs={(value: HeatmapPixel) => ({
                    'data-tip': value.count > 0 ? `${value.count} tweet${value.count > 1 ? 's' : ''}` : undefined,
                })}
                showWeekdayLabels={true}
            />
            <ReactTooltip backgroundColor="#343a40" />
        </>
    );
}
