import RandomWalkParameters from "./RandomWalkParameters";
import StepResult from "./StepResult";
import WalkResult from "./WalkResult";

class RandomWalk {
  params: RandomWalkParameters;
  underlyingPrices: number[];
  leveragedPrices2x: number[];

  constructor(params: RandomWalkParameters) {
    this.params = params;
    this.underlyingPrices = [this.params.underlyingStartPrice];
    this.leveragedPrices2x = [this.params.leveraged2xStartPrice];
  }

  step(): StepResult {
    const percentChange = Math.random() * this.params.volatility;

    const previousPriceIndex = this.underlyingPrices.length - 1;
    const percentChangeAsDecimal = 1 + (percentChange * 0.01);

    const nextUnderlyingPrice = this.underlyingPrices[previousPriceIndex] * percentChangeAsDecimal;
    const nextLeveraged2xPrice = this.leveragedPrices2x[previousPriceIndex] * percentChangeAsDecimal * 2;

    return {
      nextUnderlyingPrice,
      nextLeveraged2xPrice,
    };
  }

  walk(): WalkResult {
    for (let i = 0; i < this.params.iterations; i++) {
      const { nextUnderlyingPrice, nextLeveraged2xPrice } = this.step();

      this.underlyingPrices[i] = nextUnderlyingPrice;
      this.leveragedPrices2x[i] = nextLeveraged2xPrice;
    }

    return {
      underlyingPrices: this.underlyingPrices,
      leveragedPrices2x: this.leveragedPrices2x,
    }
  }
}

export default RandomWalk;