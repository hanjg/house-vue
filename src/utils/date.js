export function formatDate(data) {
  let dt = new Date(data);
  return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' '
    + dt.getHours() + ':'
    + dt.getMinutes() + ':' + dt.getSeconds();
}
