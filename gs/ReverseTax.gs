// Tax bracket boundaries and calculations for 2026
const TAX_BRACKETS = [
  { income: 18200, rate: 0.00, postTaxAtBoundary: 18200, taxAtBoundary: 0 },
  { income: 45000, rate: 0.16, postTaxAtBoundary: 40712, taxAtBoundary: 4288 },
  { income: 135000, rate: 0.30, postTaxAtBoundary: 103712, taxAtBoundary: 31288 },
  { income: 190000, rate: 0.37, postTaxAtBoundary: 138362, taxAtBoundary: 51638 },
  { income: Infinity, rate: 0.45, postTaxAtBoundary: Infinity, taxAtBoundary: 168362 }
];

/**
 * Calculate pre-tax income from post-tax income
 * @param {number} postTaxIncome - The after-tax income
 * @return {number} The pre-tax income
 */
/**
 * Calculate pre-tax income from post-tax income
 * @param {number} postTaxIncome - The after-tax income
 * @return {number} The pre-tax income
 */
function getPreTaxIncome(postTaxIncome) {
  if (postTaxIncome <= 0) {
    return 0;
  }

  if (postTaxIncome <= 18200) {
    // In the 0% bracket
    return postTaxIncome;
  }

  if (postTaxIncome <= 40712) {
    // In the 16% bracket - effective after-tax rate is 84%
    return (postTaxIncome - 18200) / 0.84 + 18200;
  }

  if (postTaxIncome <= 103712) {
    // In the 30% bracket - effective after-tax rate is 70%
    return (postTaxIncome - 40712) / 0.70 + 45000;
  }

  if (postTaxIncome <= 138362) {
    // In the 37% bracket - effective after-tax rate is 63%
    return (postTaxIncome - 103712) / 0.63 + 135000;
  }

  // In the 45% bracket - effective after-tax rate is 55%
  return (postTaxIncome - 138362) / 0.55 + 190000;
}


/**
 * Calculate post-tax income from pre-tax income (verification)
 * @param {number} preTaxIncome - The pre-tax income
 * @return {number} The post-tax income
 */
function getPostTaxIncome(preTaxIncome) {
  if (preTaxIncome <= 18200) {
    return preTaxIncome;
  }

  let tax = 0;

  // $0 - $18,200: 0%
  // Already handled above

  // $18,200 - $45,000: 16%
  if (preTaxIncome > 18200) {
    const incomeInBracket = Math.min(preTaxIncome, 45000) - 18200;
    tax += incomeInBracket * 0.16;
  }

  // $45,000 - $135,000: 30%
  if (preTaxIncome > 45000) {
    const incomeInBracket = Math.min(preTaxIncome, 135000) - 45000;
    tax += incomeInBracket * 0.30;
  }

  // $135,000 - $190,000: 37%
  if (preTaxIncome > 135000) {
    const incomeInBracket = Math.min(preTaxIncome, 190000) - 135000;
    tax += incomeInBracket * 0.37;
  }

  // $190,000+: 45%
  if (preTaxIncome > 190000) {
    const incomeInBracket = preTaxIncome - 190000;
    tax += incomeInBracket * 0.45;
  }

  return Math.round((preTaxIncome - tax) * 100) / 100;
}

