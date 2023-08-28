document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convert");
  const currencySelect = document.getElementById("currency");
  const amountInput = document.getElementById("amount");
  const resultDiv = document.getElementById("result");

  convertButton.addEventListener("click", async function () {
    const currencyCode = currencySelect.value;
    const amount = parseFloat(amountInput.value);

    const exchangeRate = await getExchangeRate(currencyCode);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    resultDiv.textContent = `${amount.toFixed(
      2
    )} ${currencyCode} = ${convertedAmount} PLN`;
  });

  async function getExchangeRate(currencyCode) {
    const response = await fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/?format=json`
    );
    const data = await response.json();
    return data.rates[0].mid;
  }
});
