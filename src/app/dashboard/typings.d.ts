declare namespace dashboard {
  interface yarnStockOverview {
    yarnStockOverview: {
      totalYarn: number;
      totalReorderYarn: number;
      categoryChart: chartData[];
      colorCategoryChart: chartData[];
    };
    categoryCount: number;
    colorCategoryCount: number;
  }

  interface chartData {
    value: number;
    name: string;
  }
}
