import ICustomData from '@/models/ICustomData';
import IUserComment from '@/models/IUserComment';

const saveCustomData = (id: number, rating?: number, comment?: IUserComment): void => {
    const savedData = localStorage.getItem('customData');
    const newData: ICustomData = {
            movieId: id,
            userRating: rating ?? 0,
            userComments: comment ? [comment] : [],
        }
    if (savedData) {
        const customData: ICustomData[] = JSON.parse(savedData);
        const matchedIndex = customData.findIndex((item) => item.movieId === id);
        if (matchedIndex < 0) {
            customData.push(newData);
        } else {
            rating && (customData[matchedIndex].userRating = rating)
            comment && customData[matchedIndex].userComments.push(comment);
        }

        localStorage.setItem('customData', JSON.stringify(customData));
    } else {
        localStorage.setItem('customData', JSON.stringify([newData]));
    }
};

export default saveCustomData;