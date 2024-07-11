export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    console.log(hours);
    return `${hours !== 0 ? `${hours} год.` : ''} ${minutes !== 0 ? `${minutes} хв` : ''}. ${secondsLeft} сeк.`;
};
