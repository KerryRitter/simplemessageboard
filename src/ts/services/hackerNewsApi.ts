import jQuery from "jquery";
import { provide } from "../ioc";

@provide("HackerNewsApi")
export class HackerNewsApi {
    public getTopStories(): Promise<number[]> {
        return new Promise((resolve, reject) => {
            jQuery.ajax("https://hacker-news.firebaseio.com/v0/topstories.json")
                .then(resolve)
                .fail(reject);
        });
    }
}
