export const zeroPadding = (value) => value < 10 ? `0${value}` : `${value}`;

export const arraySortByTime = (readings) => {
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

export const groupByDay = (readings) => {
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