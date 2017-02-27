import React from "react";
import { inject } from "inversify";
import { lazyInject } from "../../../lib/ioc";
import { Thread } from "../../../core/models";
import { ThreadApiService } from "../services";
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