import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(public http: HttpClient) { }

    public getCommentsPerTopic(id: any): Observable<Comment[]> {
        return this.http.get<Comment[]>('http://127.0.0.1:5000/api/topic/commentsByTopicId/' + id);
    }
    public addComment(comment): Observable<Comment> {
        return this.http.post<Comment>('http://127.0.0.1:5000/api/comment/add' , comment);
    }
    public getComment(id): Observable<Comment> {
        return this.http.get<Comment>('http://127.0.0.1:5000/api/topic/comment/' + id);
    }
    public deleteComment(id): Observable<Comment> {
        return this.http.delete<Comment>('http://127.0.0.1:5000/api/comment/delete/' + id);
    }
    public likeComment(idC, idU): Observable<Comment> {
        return this.http.post<Comment>('http://127.0.0.1:5000/api/topic/like/' + idC + '/' + idU, idC);
    }
    public dislikeComment(idC, idU): Observable<Comment> {
        return this.http.post<Comment>('http://127.0.0.1:5000/api/topic/dislike/' + idC + '/' + idU, idC);
    }


}
