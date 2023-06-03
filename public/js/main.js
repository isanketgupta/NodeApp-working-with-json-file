
async function exportData() {
    const tableRows = document.querySelectorAll('#jsonTable tbody tr');
    const jsonData = [];

    const firstObject = {}
    const secondObject = {}
    const ThirdObject = {}

    tableRows.forEach(function(row) {
        const col1 = row.cells[0].textContent;
        const col2 = row.cells[1].textContent;

        const toggleButton = row.querySelector('input[type="checkbox"]');
        const col3 = toggleButton.checked ? true : false;

        const inputElement = row.cells[3].querySelector('input[type="text"]');
        const col4 = inputElement.value;

        firstObject[col1] = col2;
        secondObject[col1] = col3;
        ThirdObject[col1] = col4;
    });

    jsonData.push(firstObject);
    jsonData.push(secondObject);
    jsonData.push(ThirdObject);

    const jsonStr = await JSON.stringify(jsonData, null, 2);
    console.log(jsonStr)
    fetch(`/download?data=${encodeURIComponent(JSON.stringify(jsonData))}`, {
        method: 'get',
      })
      .then(result => {
        console.log(result);
      })     
}