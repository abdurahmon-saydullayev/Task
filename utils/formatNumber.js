const FormatNumber = ({ number, maxLength }) => {
    const numLength = String(number).length;
    if (!number) return;

    let zeros = "";
    if (numLength < maxLength) {
        for (let i = 0; i < maxLength - numLength; i++) {
            zeros += "0";
        }
    }
    return zeros + String(number);
};

module.exports = FormatNumber;
