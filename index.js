document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convert");
  const currencySelect = document.getElementById("currency");
  const amountInput = document.getElementById("amount");
  const resultDiv = document.getElementById("result");

  convertButton.addEventListener("click", async function () {
    const currencyCode = currencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
      resultDiv.textContent = "Podaj prawidłową kwotę większą od zera.";
      return; // Zakończ funkcję, jeśli kwota jest nieprawidłowa
    }

    try {
      const exchangeRate = await getExchangeRate(currencyCode);
      if (exchangeRate !== undefined) {
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        resultDiv.textContent = `${amount.toFixed(
          2
        )} ${currencyCode} = ${convertedAmount} PLN`;
      } else {
        resultDiv.textContent =
          "Nie można przeliczyć kwoty. Spróbuj ponownie później.";
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
      resultDiv.textContent = "Wystąpił błąd podczas pobierania kursu waluty.";
    }
  });

  async function getExchangeRate(currencyCode) {
    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/?format=json`
      );
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.rates[0].mid;
    } catch (error) {
      throw error;
    }
  }
});
