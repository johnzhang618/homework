const fakeData = {
    gridState: [
        {
            icon: "⚡️",
            term: "Power draw",
            value: "1.4"
        },
        {
            icon: "☀️️",
            term: "Solar power production",
            value: "5.8"
        },
        {
            icon: "🔌️",
            term: "Fed into grid",
            value: "4.4"
        },
    ],
    devices: [
        {
            name: "Air conditioner",
            value: "0.3093"
        },
        {
            name: "Wi-Fi router",
            value: "0.0518"
        },
        {
            name: "Smart TV",
            value: "0.1276"
        },
        {
            name: "Diffuser",
            value: "0.0078"
        },
        {
            name: "Refrigerator",
            value: "0.0923"
        },
    ]
}

export const getOverviewData = () => {
    return fakeData
}