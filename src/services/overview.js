export const fakeData = {
  gridState: [
    {
      icon: '⚡️',
      term: 'Power draw',
      value: '1.4',
    },
    {
      icon: '☀️️',
      term: 'Solar power production',
      value: '5.8',
    },
    {
      icon: '🔌️',
      term: 'Fed into grid',
      value: '4.4',
    },
  ],
  devices: [
    {
      name: 'Air conditioner',
      value: '0.3093',
    },
    {
      name: 'Wi-Fi router',
      value: '0.0518',
    },
    {
      name: 'Smart TV',
      value: '0.1276',
    },
    {
      name: 'Diffuser',
      value: '0.0078',
    },
    {
      name: 'Refrigerator',
      value: '0.0923',
    },
  ],
};

const randomGridValue = (current) => (Math.random() * current * 4 + 0.5).toFixed(1);
const randomDeviceValue = (current) => ((Math.random() * current) / 5 + 0.05).toFixed(4);

// 模拟接口请求
export const getOverviewData = () => new Promise((resolve) => {
  const current = (new Date()).getHours() / 24;
  const result = {
    gridState: [...new Array(fakeData.gridState.length)].map((_, index) => ({
      icon: fakeData.gridState[index].icon,
      term: fakeData.gridState[index].term,
      value: randomGridValue(current),
    })),
    devices: [...new Array(fakeData.devices.length)].map((_, index) => ({
      name: fakeData.devices[index].name,
      value: randomDeviceValue(current),
    })),
  };
  setTimeout(() => resolve(result), 500);
});
export default { getOverviewData };
