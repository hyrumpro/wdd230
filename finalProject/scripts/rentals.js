
fetch('./data/rentals-prices.json')
    .then(response => response.json())
    .then(data => {
        // Populate scooter prices
        const scooterPricesBody = document.getElementById('scooter-prices');
        data.scooters.forEach(scooter => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${scooter.model}</td>
        <td>${scooter.maxPersons}</td>
        <td>$${scooter.halfDayPrice}</td>
        <td>$${scooter.fullDayPrice}</td>
      `;
            scooterPricesBody.appendChild(row);
        });

        // Populate ATV prices
        const atvPricesBody = document.getElementById('atv-prices');
        data.atvs.forEach(atv => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${atv.model}</td>
        <td>${atv.maxPersons}</td>
        <td>$${atv.halfDayPrice}</td>
        <td>$${atv.fullDayPrice}</td>
      `;
            atvPricesBody.appendChild(row);
        });

        const jeepPricesBody = document.getElementById('jeep-prices');
        data.jeeps.forEach(jeep => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${jeep.model}</td>
        <td>${jeep.maxPersons}</td>
        <td>$${jeep.halfDayPrice}</td>
        <td>$${jeep.fullDayPrice}</td>
      `;
            jeepPricesBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching rental prices:', error);
    });