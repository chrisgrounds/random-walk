import RandomWalkParameters from "./RandomWalkParameters";
import StepResult from "./StepResult";
import WalkResult from "./WalkResult";

class RandomWalk {
  params: RandomWalkParameters;
  underlyingPrices: number[];
  leveragedPrices2x: number[];
  leveragedPrices3x: number[];

  constructor(params: RandomWalkParameters) {
    this.params = params;
    this.underlyingPrices = [this.params.underlyingStartPrice];
    this.leveragedPrices2x = [this.params.leveraged2xStartPrice];
    this.leveragedPrices3x = [this.params.leveraged3xStartPrice];
  }

  generatePercentChange(sign: boolean, seed: number, leverage: number = 1): number {
    const percentChange = seed * this.params.volatility;

    return (sign)
      ? 1 + (percentChange * leverage * 0.01)
      : 1 - (percentChange * leverage * 0.01);
  }

  step(): StepResult {
    const randomNumber = Math.random();
    const signIsPositive = Math.random() > 0.5;

    const p1 = this.generatePercentChange(signIsPositive, randomNumber);
    const p2 = this.generatePercentChange(signIsPositive, randomNumber, 2);
    const p3 = this.generatePercentChange(signIsPositive, randomNumber, 3);

    const previousPriceIndex = this.underlyingPrices.length - 1;

    const nextUnderlyingPrice = this.underlyingPrices[previousPriceIndex] * p1;
    const nextLeveraged2xPrice = this.leveragedPrices2x[previousPriceIndex] * p2;
    const nextLeveraged3xPrice = this.leveragedPrices3x[previousPriceIndex] * p3;

    return {
      nextUnderlyingPrice,
      nextLeveraged2xPrice,
      nextLeveraged3xPrice
    };
  }

  walk(): WalkResult {
    for (let i = 1; i < this.params.iterations; i++) {
      const { nextUnderlyingPrice, nextLeveraged2xPrice, nextLeveraged3xPrice } = this.step();

      this.underlyingPrices[i] = nextUnderlyingPrice;
      this.leveragedPrices2x[i] = nextLeveraged2xPrice;
      this.leveragedPrices3x[i] = nextLeveraged3xPrice;
    }

    return {
      underlyingPrices: this.underlyingPrices,
      leveragedPrices2x: this.leveragedPrices2x,
      leveragedPrices3x: this.leveragedPrices3x,
    }
  }
}

export default RandomWalk;
