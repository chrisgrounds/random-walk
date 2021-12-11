import { useEffect, useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import RandomWalkParameters from "../domain/RandomWalkParameters";
import RandomWalk from "../domain/RandomWalk";
import WalkResult from "../domain/WalkResult";
import ChartDataset from "../domain/ChartDataset";

const constructChart = (context: HTMLElement, dataset: ChartDataset[]): any => {
  return new Chart(context, {
    type: 'line',
    data: {
      labels: dataset[0].prices.map((_: any, index: number) => index),
      datasets: dataset.map(d => ({
        label: d.label,
        data: d.prices,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }))
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

let chart;

const Home: NextPage = () => {
  const [startPrice, setStartPrice] = useState(1009);
  const [volatility, setVolatility] = useState(3);
  const [floorPrice, setFloorPrice] = useState(800);
  const [iterations, setIterations] = useState(20);
  const [fatTailed, setFatTailed] = useState(false);
  const [leveraged, setLeveraged] = useState(false);


  useEffect(() => {
    if (document) {
      if (chart) {
        chart.destroy();
      }

      const ctx = document.getElementById('myChart').getContext('2d');

      const randomWalkConfig: RandomWalkParameters = {
        underlyingStartPrice: startPrice,
        leveraged2xStartPrice: 870,
        floorPrice: 900,
        fatTailed: false,
        iterations: iterations,
        volatility: volatility,
        leveraged: false,
      };
      const randomWalk: RandomWalk = new RandomWalk(randomWalkConfig);
      const walkResult: WalkResult = randomWalk.walk();

      const underlyingPrices: number[] = walkResult.underlyingPrices;
      const leveraged2xPrice: number[] = walkResult.leveragedPrices2x;

      const underlyingData = new ChartDataset("Underlying price", underlyingPrices);
      const leveraged2xData = new ChartDataset("2x price", leveraged2xPrice);

      chart = constructChart(ctx, [underlyingData, leveraged2xData]);
    }
  }, [startPrice, volatility, iterations]);

  return (
    <div className={styles.container}>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

      <Head>
        <title>Random walk</title>
        <meta name="description" content="Random walk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">A Random Walk!</a>
        </h1>

        <p className={styles.description}>
          Generate a random walk by changing the values below
        </p>

        <div className={styles.grid}>
          <div>
            <label>Start Price</label>
            <input value={startPrice} type="number" step="0.01" onChange={(e) => { setStartPrice(parseFloat(e.target.value)) }} />
          </div>

          <div>
            <label>Volatility %</label>
            <input value={volatility} type="number" step="0.01" onChange={(e) => { setVolatility(parseFloat(e.target.value)) }} />
          </div>

          <div>
            <label>Iterations</label>
            <input value={iterations} type="number" onChange={(e) => { setIterations(parseFloat(e.target.value)) }} />
          </div>
        </div>

        <div className="chart-container">
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home