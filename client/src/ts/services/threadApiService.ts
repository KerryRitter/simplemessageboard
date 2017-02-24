import jQuery from "jquery";
import { Thread } from "../models";
import { provide } from "../ioc";

@provide("ThreadApiService")
export class ThreadApiService {
    public create(thread: Thread): Promise<any> {
        return new Promise((resolve, reject) => {
            jQuery.ajax({
                url: "/api/threads",
                type: "POST",
                data: thread
            })
            .then(resolve)
            .fail(reject);
        });
    }

    public getAll(): Promise<Thread[]> {
        return new Promise((resolve, reject) => {
            jQuery.ajax({
                url: "/api/threads",
                type: "GET"
            })
            .then(resolve)
            .fail(reject);
        });
    }
}
