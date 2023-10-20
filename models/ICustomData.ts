import IUserComment from './IUserComment';

export default interface ICustomData {
    movieId: number;
    userRating: number;
    userComments: IUserComment[];
}