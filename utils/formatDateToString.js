const FormatDateToString = () => {
    const d = new Date();
    const day = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;
    const month =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
};

module.exports = FormatDateToString; // 28-06-2021
