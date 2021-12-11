interface RandomWalkParameters {
  underlyingStartPrice: number;
  leveraged2xStartPrice: number;
  leveraged3xStartPrice: number;
  volatility: number;
  floorPrice: number;
  iterations: number;
  fatTailed: boolean;
  leveraged: boolean;
}

export default RandomWalkParameters;
