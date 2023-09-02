export default function getTime(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;

    if (hours === 0) {
        return `${minutes} Mins`;
    } else if (minutes === 0) {
        return `${hours} Hours`;
    } else {
        return `${hours} Hours ${minutes} Mins`;
    }
}
