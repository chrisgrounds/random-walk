interface RenderableChartDataset {
  label: string;
  prices: number[];
  borderColor: string;
};

class ChartDataset implements RenderableChartDataset {
  label: string;
  prices: number[];
  borderColor: string;

  constructor(label: string, prices: number[], borderColor: string) {
    this.label = label;
    this.prices = prices;
    this.borderColor = borderColor;
  }
}

export default ChartDataset;
