const buildAnalysisData = function(rowData, fields) {
  const analysisData = rowData.map((e, i) => {
    const f = {};
    if (i > 0) {
      fields.forEach(g => {
        f[g + ' yield'] = e[g] / rowData[0][g];
        f[g + ' variance'] = Math.pow(Math.log(e[g] / rowData[i - 1][g]), 2);
      });
    }
    return f;
  });

  analysisData.forEach((e, i) => {
    fields.forEach(f => {
      if (i == 0) {
        e[f + ' variance cumul'] = 0;
      } else {
        e[f + ' variance cumul'] =
          e[f + ' variance'] + analysisData[i - 1][f + ' variance cumul'];
        e[f + ' volatility'] = Math.pow(e[f + ' variance cumul'], 0.5);
        e[f + ' sharpe'] = (e[f + ' yield'] - 1) / e[f + ' volatility'];
      }
    });
  });

  return analysisData;
};

export default {
  buildAnalysisData
};
