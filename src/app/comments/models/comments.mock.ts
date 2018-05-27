import { Comment } from './comment.model';

export const MOCK_REPLIES: Comment[] = [
    {
        id: '11', likes: 41, dislikes: 54, text: 'Very good comment', user: 'Kaki Gadol', date: new Date(), parentCommentId: '1'
    },
    {
        id: '12', likes: 2, dislikes: 34, text: 'Shnitzel', user: 'Dorifnurd', date: new Date(), parentCommentId: '1'
    },
    {
        id: '13', likes: 9, dislikes: 894, text: 'Very Baddddd comment', user: 'Doly deni', date: new Date(), parentCommentId: '2'
    },
    {
        id: '14', likes: 11, dislikes: 74, text: 'Too real for me', user: 'Pony tail', date: new Date(), parentCommentId: '2'
    },
    {
        id: '15', likes: 741, dislikes: 12,
        text: 'I really whish I could though of this comment myself', user: 'Kaki Katan', date: new Date(), parentCommentId: '2'
    },
    {
        id: '16', likes: 1, dislikes: 744, text: 'Doris loved this comment', user: 'Rehoven', date: new Date(), parentCommentId: '2'
    }];

export const MOCK_COMMENTS: Comment[] = [
    // tslint:disable-next-line:max-line-length
    { id: '1', likes: 2328, dislikes: 1, text: 'Like this comment if you like this video', user: 'Android Headlines', date: new Date(), parentCommentId: '' },
    // tslint:disable-next-line:max-line-length
    { id: '2', likes: 172, dislikes: 10, text: 'THIS IS THE BEST CAR SIMULATION VIDEO I HAVE EVER SEEEEEN', user: 'Android Headlines', date: new Date(), parentCommentId: '' },
    // tslint:disable-next-line:max-line-length
    { id: '3', likes: 1, dislikes: 17, text: 'Only 90s kids will understand the stuff that is talked about in this video', user: 'Android Headlines', date: new Date(), parentCommentId: '' },
    // tslint:disable-next-line:max-line-length
    { id: '4', likes: 242, dislikes: 410, text: 'Like if you watch this video every day', user: 'Android Headlines', date: new Date(), parentCommentId: '' },
    // tslint:disable-next-line:max-line-length
    { id: '5', likes: 555, dislikes: 110, text: 'Good good video, video is great for looking at', user: 'Android Headlines', date: new Date(), parentCommentId: '' },
    // tslint:disable-next-line:max-line-length
    { id: '6', likes: 53, dislikes: 1630, text: 'Big big video, like to like it, as I like to look at other videos as well, vergy fun to see.', user: 'Android Headlines', date: new Date(), parentCommentId: '' },
];
