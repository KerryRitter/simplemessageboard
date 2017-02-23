import jQuery from "jquery";

export class HackerNewsApi {
    public getTopStories() {
        return jQuery.ajax("https://hacker-news.firebaseio.com/v0/topstories.json");
    }
}