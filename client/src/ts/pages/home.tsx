import React from "react";
import { inject } from "inversify";
import { ThreadApiService } from "../services";
import { lazyInject } from "../ioc";
import { Thread } from "../models";
import { ThreadPostForm, ThreadView } from "../components";

interface HomeState {
    threads: Thread[];
}

export class Home extends React.Component<any, HomeState> {
    @lazyInject("ThreadApiService")
    private _threadApiService: ThreadApiService

    public constructor(props: any) {
        super();
        this.state = {
            threads: []
        };
    }

    public render() {
        return (
            <div>
                { this.state.threads.map(thread => <ThreadView key={thread["_id"]} thread={thread} /> ) }

                <ThreadPostForm onThreadCreate={() => this.getThreads()} />
            </div>
        )
    }

    public componentDidMount() {
        this.getThreads();
    }

    public async getThreads() {
        const threads = await this._threadApiService.getAll();

        this.setState({
            threads
        });
    }
}