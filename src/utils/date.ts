export function getShortDate(date: Date | string) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}