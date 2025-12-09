function priceCheck(price) {
  if (price == 1.50) {
    return 'match';
  }
}

function strictPriceCheck(price) {
  if (price === 1.50) {
    return 'match';
  }
}

// expose to browser global (redundant in many environments but explicit)
window.priceCheck = priceCheck;
window.strictPriceCheck = strictPriceCheck;

