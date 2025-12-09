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

// Small in-page demo for manual verification
document.addEventListener('DOMContentLoaded', () => {
  const out = [];
  out.push(`priceCheck(1.50): ${priceCheck(1.50)}`);
  out.push(`priceCheck('1.50'): ${priceCheck('1.50')}`);
  out.push(`priceCheck(1.00): ${priceCheck(1.00)}`);
  out.push(`strictPriceCheck(1.50): ${strictPriceCheck(1.50)}`);
  out.push(`strictPriceCheck('1.50'): ${strictPriceCheck('1.50')}`);
  out.push(`strictPriceCheck(1.00): ${strictPriceCheck(1.00)}`);

  const el = document.getElementById('result');
  if (el) el.innerText = out.join('\n');
});

