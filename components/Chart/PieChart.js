import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function MyResponsivePie({ title, subtitle, data }) {
    return (
        <>
            <h3>{title}</h3>

            <div style={{ height: "95%", width: "99%", position: "relative" }}>
                <ResponsivePie
                    data={data}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    sortByValue={true}
                    innerRadius={0.5}
                    padAngle={1}
                    cornerRadius={5}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: "nivo" }}
                    borderWidth={1}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", "0.4"]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 2]],
                    }}
                    motionConfig="slow"
                    transitionMode="endAngle"
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 20,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 70,
                            itemHeight: 18,
                            itemTextColor: "#999",
                            itemDirection: "left-to-right",
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000",
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </>
    );
}
