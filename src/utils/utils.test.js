import { } from "./utils";

// 尝试使用TDD方式进行开发 


// todo: getChartData 获取最终渲染所需数据
// 原项目是直接调用多个函数计算得出 调用的getReadings方法可能出现问题 且缺乏拓展性
// 传入所需数据的范围和纬度来获取对应数据
describe("#getChartData", () => {
    // todo: 检测数据范围是否达标
    it("should generate result with specified range", () => {
        const range = 100;
        expect(getChartData(range)).toHaveLength(range);
    });
    // todo: 检测数据纬度为天、时时返回数据是否准确（每秒小于1.1大于0.4）
    it("should generate result by day && ordered by time descending && the result value in a normal range", () => {
        const
            unitRange = 60 * 60 * 24,
            max = 1.1 * unitRange,
            min = 0.4 * unitRange,
            range = 30,
            unit = "daily",
            result = getChartData(range, unit);
        expect(result[1].value).toBeWithinRange(min, max);
        expect(result[1].time % unitRange).toBe(0);
        expect(result[1].time - result[2].time).toBe(unitRange);
    });
    it("should generate result by hour && ordered by time descending && the result value in a normal range", () => {
        const
            unitRange = 60 * 60,
            max = 1.1 * unitRange,
            min = 0.4 * unitRange,
            range = 24,
            unit = "hourly",
            result = getChartData(range, unit);
        expect(result[1].value).toBeWithinRange(min, max);
        expect(result[1].time % unitRange).toBe(0);
        expect(result[1].time - result[2].time).toBe(unitRange);
    });
});

// todo: formatUnitLabel 对应原项目formatDateLabel
// 增加拓展性 兼容小时单位
describe("#chart formatUnitLabel", () => {
    it("should format unit label", () => {
        expect(formatUnitLabel(new Date(2021, 0, 1).getTime(), "daily")).toBe("01/01");
        expect(formatUnitLabel(new Date(2021, 1, 1).getTime(), "daily")).toBe("01/02");
        expect(formatUnitLabel(new Date(2021, 5, 1).getTime(), "daily")).toBe("01/06");
        expect(formatUnitLabel(new Date(2021, 11, 1).getTime(), "daily")).toBe("01/12");
        expect(formatUnitLabel(new Date(2021, 11, 25).getTime(), "daily")).toBe("25/12");
        expect(formatUnitLabel(new Date(2021, 11, 31).getTime(), "daily")).toBe("31/12");
        expect(formatUnitLabel(new Date(2021, 11, 31, 11).getTime(), "hourly")).toBe("11:00");
        expect(formatUnitLabel(new Date(2021, 11, 31, 12).getTime(), "hourly")).toBe("12:00");
        expect(formatUnitLabel(new Date(2021, 11, 31, 9).getTime(), "hourly")).toBe("09:00");
        expect(formatUnitLabel(new Date(2021, 11, 31, 0).getTime(), "hourly")).toBe("00:00");
    });
});

// todo: groupByRange 对应原项目 groupedByDay
// 增加拓展性 兼容group by hour
describe("#groupByFormat", () => {
    it("should get readings grouped by day", () => {
        const readings = [
            {
                time: new Date(2021, 12, 17, 10, 24).getTime(),
                value: 50
            },
            {
                time: new Date(2021, 12, 17, 9, 24).getTime(),
                value: 40,
            },
            {
                time: new Date(2021, 12, 17, 9, 24).getTime(),
                value: 40,
            },
            {
                time: new Date(2021, 12, 16, 10, 34).getTime(),
                value: 35,
            },
        ];

        const groupedReadings = groupByFormat(readings, "hourly");
        expect(groupedReadings).toHaveLength(3);
        expect(
            groupedReadings.find(
                (reading) => reading.time === new Date(2021, 12, 17, 9).getTime()
            ).value
        ).toBe(80);
        expect(
            groupedReadings.find(
                (reading) => reading.time === new Date(2021, 12, 16, 10).getTime()
            ).value
        ).toBe(35);
    });

    it("should get readings grouped by day", async () => {
        const readings = [
            {
                time: new Date(2021, 12, 17, 10, 24).getTime(),
                value: 50
            },
            {
                time: new Date(2021, 12, 17, 9, 24).getTime(),
                value: 40,
            },
            {
                time: new Date(2021, 12, 16, 10, 34).getTime(),
                value: 35,
            },
            {
                time: new Date(2021, 12, 15, 11, 34).getTime(),
                value: 25,
            },
        ];

        const groupedReadings = groupByFormat(readings);
        expect(groupedReadings).toHaveLength(3);
        expect(
            groupedReadings.find(
                (reading) => reading.time === new Date(2021, 12, 17).getTime()
            ).value
        ).toBe(90);
        expect(
            groupedReadings.find(
                (reading) => reading.time === new Date(2021, 12, 16).getTime()
            ).value
        ).toBe(35);
    });
});

// todo: sortByTime 数据排序
// 原项目方法可直接搬
describe("#sortByTime", () => {
    it("should put latest reading to the last", () => {
        const readings = [
            {
                time: new Date(2021, 12, 17, 10, 24).getTime(),
                value: 50
            },
            {
                time: new Date(2021, 12, 17, 9, 24).getTime(),
                value: 40,
            },
            {
                time: new Date(2021, 12, 17, 11, 34).getTime(),
                value: 35,
            },
            {
                time: new Date(2021, 12, 15, 11, 34).getTime(),
                value: 25,
            },
        ];

        const sortedReading = sortByTime(readings);
        expect(sortedReading).toHaveLength(4);
        expect(sortedReading[0]).toMatchObject({
            time: new Date(2021, 12, 15, 11, 34).getTime(),
            value: 25,
        });
        expect(sortedReading[3]).toMatchObject({
            time: new Date(2021, 12, 17, 11, 34).getTime(),
            value: 35,
        });
    });

    it("should not change original array", () => {
        const readings = [
            { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
            {
                time: new Date(2021, 12, 17, 9, 24).getTime(),
                value: 40,
            },
            {
                time: new Date(2021, 12, 15, 11, 34).getTime(),
                value: 25,
            },
        ];

        const sortedReading = sortByTime(readings);
        expect(sortedReading).toHaveLength(3);
        expect(sortedReading).toEqual([
            {
                time: new Date(2021, 12, 17, 10, 24).getTime(),
                value: 50
            },
            {
                time: new Date(2021, 12, 17, 9, 24).getTime(),
                value: 40,
            },
            {
                time: new Date(2021, 12, 15, 11, 34).getTime(),
                value: 25,
            },
        ]);
    });
});





// getReadings 获取原始数据
// 
// 这个函数没有问题， 但是调用可能会出现问题， 可以直接搬来用
describe("#getReadings", () => {
    it("should generate readings with specified length", async () => {
        const length = 100;
        expect(await getReadings(length)).toHaveLength(length);
    });

    it("should generate readings with timestamps and random values", async () => {
        const reading = (await getReadings(1))[0];

        expect(typeof reading.time).toBe("number");
        expect(typeof reading.value).toBe("number");
    });

    it("should generate readings by hours and ordered by time descending", async () => {
        const readings = await getReadings(4);

        expect(readings).toHaveLength(4);
        const OneHourInMilliseconds = 60 * 60 * 1000;
        expect(readings[0].time - readings[1].time).toBe(OneHourInMilliseconds);
        expect(readings[1].time - readings[2].time).toBe(OneHourInMilliseconds);
        expect(readings[2].time - readings[3].time).toBe(OneHourInMilliseconds);
    });
});