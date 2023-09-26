  document.addEventListener("DOMContentLoaded", function () {
    const daily = document.getElementById("btn1");
    const weekly = document.getElementById("btn2");
    const monthly = document.getElementById("btn3");
    const currentElements = document.querySelectorAll("[id^='current-']");
    const previousElements = document.querySelectorAll("[id^='previous-']");
    const url = "data.json"; // Adjust the URL to your JSON data file

    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function updateUI(timeframe) {
      const data = await fetchData();

      data.forEach((item, index) => {
        const currentElement = currentElements[index];
        const previousElement = previousElements[index];

        const selectedTimeframe = item.timeframes[timeframe];
        currentElement.textContent = selectedTimeframe.current + 'hrs';
        
        let previousText = "";
      if (timeframe === "daily") {
        previousText = "Yesterday -";
      } else if (timeframe === "weekly") {
        previousText = "Last week -";
      } else if (timeframe === "monthly") {
        previousText = "Last month -";
      }

      previousElement.textContent = previousText + ' ' + selectedTimeframe.previous + 'hrs';
    });
  }

  daily.addEventListener("click", () => {
    updateUI("daily");
  });

  weekly.addEventListener("click", () => {
    updateUI("weekly");
  });

  monthly.addEventListener("click", () => {
    updateUI("monthly");
  });

  // Call the updateUI function initially with the 'daily' timeframe
  updateUI("daily");
  });

