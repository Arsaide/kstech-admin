import { toast } from 'react-toastify';

export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    if (minutes == 29 && secondsLeft == 59) {
        toast.warning('Залишилось 30 хвилин активної сессії!', {
            autoClose: 15000,
        });
    } else if (minutes == 9 && secondsLeft == 59) {
        toast.warning('Залишилось 10 хвилин активної сессії!', {
            autoClose: 15000,
        });
    } else if (minutes == 4 && secondsLeft == 59) {
        toast.warning('Залишилось 5 хвилин активної сессії!', {
            autoClose: 15000,
        });
    } else if (minutes == 0 && secondsLeft == 59) {
        toast.warning('Залишилась 1 хвилин активної сессії!', {
            autoClose: 15000,
        });
    }

    return `${hours !== 0 ? `${hours} год.` : ''} ${minutes !== 0 ? `${minutes} хв.` : ''} ${secondsLeft} сeк.`;
};
