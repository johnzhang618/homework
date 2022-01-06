import { getOverviewData, fakeData } from "./overview";

describe("#getOverviewData", () => {
    it("should format as fakeData", async () => {
        const overview = (await getOverviewData());
        overview.gridState.forEach((item, index) => {
            expect(item.icon).toBe(fakeData.gridState[index].icon);
            expect(item.term).toBe(fakeData.gridState[index].term);
            expect(typeof item.value).toBe("string");
            expect(item.value.length).toBe(3);
        });
        overview.devices.forEach((item, index) => {
            expect(item.name).toBe(fakeData.devices[index].name);
            expect(typeof item.value).toBe("string");
            expect(item.value.length).toBe(6);
        });
    });
});