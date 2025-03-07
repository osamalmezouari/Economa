const exportToCSV = (data: any[], fileName: string) => {
  if (!data || data.length === 0) return;

  // Get columns dynamically from the keys of the first object in data
  const columns = Object.keys(data[0]);

  const csvRows = data
    .map((row) =>
      columns
        .map((column) => {
          const value = row[column] ?? '';
          // Escape double quotes in data
          return `"${value.toString().replace(/"/g, '""')}"`;
        })
        .join(',')
    )
    .join('\n');

  // Create a Blob from the CSV content (with headers included)
  const csvHeader = columns.join(',') + '\n';
  const csvContent = csvHeader + csvRows;

  // Create a link element to download the CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportToCSV;
