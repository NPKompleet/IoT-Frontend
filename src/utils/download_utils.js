const convertJSONArrayToCSV = (jsonArray) => {
    let array = typeof jsonArray != 'object' ? JSON.parse(jsonArray) : jsonArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
        let line = '';

        for (let index in array[i]) {
            if (line !== '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

const exportCSVFile = (headers, items, fileTitle) => {
    if (headers) {
        items.unshift(headers);
    }

    let jsonObject = JSON.stringify(items);
    let csv = convertJSONArrayToCSV(jsonObject);
    let exportedFilename = fileTitle + '.csv' || 'export.csv';

    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export { exportCSVFile }