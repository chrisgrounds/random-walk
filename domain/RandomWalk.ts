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

  generatePercentChange(seed: number, leverage: number = 1): number {
    const percentChange = seed * this.params.volatility;

    if (seed < 0.5) {
      return 1 - (percentChange * leverage * 0.01);
    }
    return 1 + (percentChange * leverage * 0.01);
  }

  step(): StepResult {
    const randomNumber = Math.random();

    const p1 = this.generatePercentChange(randomNumber);
    const p2 = this.generatePercentChange(randomNumber, 2);

    const previousPriceIndex = this.underlyingPrices.length - 1;

    const nextUnderlyingPrice = this.underlyingPrices[previousPriceIndex] * p1;
    const nextLeveraged2xPrice = this.leveragedPrices2x[previousPriceIndex] * p2;

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
