export default (string: string) => 
    string.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });