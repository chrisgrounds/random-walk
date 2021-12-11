interface IChartDataset {
  label: string;
  prices: number[];
};

class ChartDataset implements IChartDataset {
  label: string;
  prices: number[];

  constructor(label: string, prices: number[]) {
    this.label = label;
    this.prices = prices;
  }
}

export default ChartDataset;
