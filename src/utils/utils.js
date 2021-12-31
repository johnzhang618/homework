export const zeroPadding = (value) => value < 10 ? `0${value}` : `${value}`;

// length: 获取数据范围，单位小时
export const getReadings = (length = 1200) => {
    const current = Date.now();
    const hour = 1000 * 60 * 60;
    return [...new Array(length)].map((_, index) => ({
        time: current - index * hour,
        value: Math.random() * 0.7 + 0.4,
    }));
};

export const sortByTime = (readings) => {
    console.log(readings)
    return [...readings].sort(
        (readingA, readingB) => readingA.time - readingB.time
    );
};

export const formatDateLabel = (timestamp) => {
    const
        date = new Date(timestamp),
        month = date.getMonth(),
        day = date.getDate();
    return `${zeroPadding(day)}/${zeroPadding(month + 1)}`;
};

export const formatTimeLabel = (timestamp) => {
    const
        date = new Date(timestamp),
        hour = date.getHours();
    return `${zeroPadding(hour)}:00`;
};

export const groupByFormat = (readings, unit) => {
    const
        unitSet = {
            "hourly": 1,
            "daily": 24
        },
        unitFlag = unitSet[unit];

    if (!unitFlag) {
        return false
    }

    if (unitFlag < 24) {
        return readings
    }

    const groupedByDay = readings.reduce((curr, { time, value }) => {
        const readingDate = new Date(time);
        const day = new Date(
            readingDate.getFullYear(),
            readingDate.getMonth(),
            readingDate.getDate()
        ).getTime();
        if (!curr[day]) curr[day] = 0;
        curr[day] += value;
        return curr;
    }, {});

    return Object.entries(groupedByDay).map(([day, value]) => ({
        time: Number(day),
        value,
    }));
};



export const formatChartData = (range, unit = "daily") => {
    const
        unitSet = {
            "hourly": 1,
            "daily": 1 * 24
        },
        unitFlag = unitSet[unit];

    if (!unitFlag) {
        return false
    }

    let rangeByHour = range * unitFlag;

    rangeByHour = rangeByHour % unitFlag != 0 ?
        rangeByHour - (rangeByHour % unitFlag) :
        rangeByHour;
    // const readings = await getReadings(rangeByHour);
    return sortByTime(groupByFormat(getReadings(rangeByHour), unit))
}