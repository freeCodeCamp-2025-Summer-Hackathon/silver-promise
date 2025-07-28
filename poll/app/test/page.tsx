const chartColors = [
    "#FF7F0E",
    "#1F77B4",
    "#2CA02C",
    "#D62728",
    "#9467BD",
    "#8C564B",
    "#E377C2",
    "#7F7F7F",
    "#BCBD22",
    "#17BECF",
    "#393B79",
    "#AD494A",
    "#3F7F93",
    "#B15928",
    "#756BB1",
    "#636363",
    "#6B6ECF",
    "#9C9EDE",
    "#8CA252",
    "#BD9E39",
    "#A55194",
    "#6BA6CD",
    "#F39C12",
    "#E74C3C",
    "#3498DB",
    "#2ECC71",
    "#9B59B6",
    "#F1C40F",
    "#E67E22",
    "#1ABC9C",
    "#34495E",
    "#E91E63",
    "#FF9800",
    "#795548",
    "#607D8B",
    "#8BC34A",
    "#FF5722",
    "#673AB7",
    "#009688",
    "#FF4081",
    "#536DFE",
    "#69F0AE",
    "#FFD740",
    "#FF6E40",
    "#B388FF",
];

export default function getDistinctColor() {
    return (
        <div className="flex items-center justify-center gap-5">
            <div className="bg-bar-background grid grid-cols-4 gap-4 p-8">
                {chartColors.map((color, index) => (
                    <div
                        key={index}
                        className="h-24 w-24 rounded-lg"
                        style={{ backgroundColor: color }}
                    >
                        <span className="mt-8 block text-center text-white">
                            {color}
                        </span>
                    </div>
                ))}
            </div>
            <div className="bg-table-background grid grid-cols-4 gap-4 p-8">
                {chartColors.map((color, index) => (
                    <div
                        key={index}
                        className="h-24 w-24 rounded-lg"
                        style={{ backgroundColor: color }}
                    >
                        <span className="mt-8 block text-center text-white">
                            {color}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
