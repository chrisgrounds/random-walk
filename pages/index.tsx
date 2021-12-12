import { useEffect, useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Chart from 'chart.js/auto';

import RandomWalkParameters from "../domain/RandomWalkParameters";
import RandomWalk from "../domain/RandomWalk";
import WalkResult from "../domain/WalkResult";
import ChartDataset from "../domain/ChartDataset";

import FormField from "../components/FormField";
import FormFieldBoolean from "../components/FormFieldBoolean";
import styles from '../styles/Home.module.css'

const constructChart = (context: HTMLCanvasElement, dataset: ChartDataset[]): any => {
  // @ts-ignore
  return new Chart(context, {
    type: 'line',
    data: {
      labels: dataset[0].prices.map((_: any, index: number) => index),
      datasets: dataset.map(d => ({
        label: d.label,
        data: d.prices,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: d.borderColor,
        borderWidth: 1
      }))
    },
    options: {
      scales: {
        // @ts-ignore
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// @ts-ignore
let chart;

const Home: NextPage = () => {
  const [underlyingStartPrice, setUnderlyingStartPrice] = useState(1009);
  const [leveraged2xStartPrice, setleveraged2xStartPrice] = useState(870);
  const [leveraged3xStartPrice, setleveraged3xStartPrice] = useState(2.50);
  const [volatility, setVolatility] = useState(3);
  const [floorPrice, setFloorPrice] = useState(800);
  const [iterations, setIterations] = useState(50);
  const [fatTailed, setFatTailed] = useState(false);

  useEffect(() => {
    if (document) {
      // @ts-ignore
      if (chart) {
        // @ts-ignore
        chart.destroy();
      }

      // @ts-ignore
      const ctx = document.getElementById('myChart').getContext('2d');

      const randomWalkConfig: RandomWalkParameters = {
        underlyingStartPrice: underlyingStartPrice,
        leveraged2xStartPrice: leveraged2xStartPrice,
        leveraged3xStartPrice: leveraged3xStartPrice,
        floorPrice: 900,
        fatTailed: fatTailed,
        iterations: iterations,
        volatility: volatility,
      };
      const randomWalk: RandomWalk = new RandomWalk(randomWalkConfig);
      const walkResult: WalkResult = randomWalk.walk();

      const underlyingPrices: number[] = walkResult.underlyingPrices;
      const leveraged2xPrice: number[] = walkResult.leveragedPrices2x;
      const leveraged3xPrice: number[] = walkResult.leveragedPrices3x;

      const underlyingData = new ChartDataset("Underlying price", underlyingPrices, "rgba(255, 99, 132, 1)");
      const leveraged2xData = new ChartDataset("2x price", leveraged2xPrice, "rgba(15, 99, 132, 1)");
      const leveraged3xData = new ChartDataset("3x price", leveraged3xPrice, "rgba(100, 99, 25, 1)");

      chart = constructChart(ctx, [underlyingData, leveraged2xData, leveraged3xData]);
    }
  }, [underlyingStartPrice, leveraged2xStartPrice, leveraged3xStartPrice, volatility, iterations, fatTailed]);

  return (
    <div className={styles.container}>

      <Head>
        <title>Random walk</title>
        <meta name="description" content="Random walk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to <span className={styles.emphasis}>A Random Walk!</span></h1>

        <p className={styles.description}>
          Generate a random walk by changing the values below
        </p>

        <div className={styles.grid}>
          <FormField
            label="Underlying Start Price"
            value={underlyingStartPrice}
            onChange={(e) => { setUnderlyingStartPrice(parseFloat(e.target.value)) }}
          />

          <FormField
            label="2x Leveraged Start Price"
            value={leveraged2xStartPrice}
            onChange={(e) => { setleveraged2xStartPrice(parseFloat(e.target.value)) }}
          />

          <FormField
            label="3x Leveraged Start Price"
            value={leveraged3xStartPrice}
            onChange={(e) => { setleveraged3xStartPrice(parseFloat(e.target.value)) }}
          />

          <FormField
            label="Volatility %"
            value={volatility}
            onChange={(e) => { setVolatility(parseFloat(e.target.value)) }}
          />

          <FormField
            label="Iterations"
            value={iterations}
            onChange={(e) => { setIterations(parseFloat(e.target.value)) }}
          />

          <FormFieldBoolean
            label="Fat tailed?"
            value={fatTailed}
            onChange={(e) => { setFatTailed(e.target.checked) }}
          />
        </div>

        <div className="chart-container">
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </main>

      <footer className={styles.footer}>
        Created by Christopher Grounds
      </footer>
    </div>
  )
}

export default Home
