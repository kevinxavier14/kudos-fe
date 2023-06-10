// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function MyResponsiveLine({
    title,
    subtitle,
    data,
    legend_x,
    legend_y,
    colorSet,
}) {
    return (
        <>
            <h3>{title}</h3>
            <small>{subtitle}</small>
            <div style={{ height: "90%", width: "99%", position: "relative" }}>
                <ResponsiveLine
                    data={data}
                    margin={{ top: 20, right: 50, bottom: 110, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -20,
                        legend: legend_x,
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: legend_y,
                        legendOffset: -40,
                        legendPosition: "middle",
                        format: (e) => Math.floor(e) === e && e,
                    }}
                    colors={{ scheme: colorSet }}
                    lineWidth={2}
                    pointSize={10}
                    pointColor="#ffffff"
                    pointBorderWidth={4}
                    pointBorderColor={{ from: "serieColor", modifiers: [] }}
                    pointLabelYOffset={-11}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 80,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    motionConfig="slow"
                />
            </div>
        </>
    );
}
