import React from "react";
import { ThreadApiService } from "../services";
import { lazyInject } from "../../../lib/ioc";
import { Thread } from "../../../core/models";

interface ThreadViewProps {
    onThreadCreate: Function;
}

interface ThreadViewState {
    thread: Thread;
}

export class ThreadPostForm extends React.Component<ThreadViewProps, ThreadViewState> {
    @lazyInject("ThreadApiService")
    private readonly _threadApiService: ThreadApiService;

    public constructor(props: any) {
        super(props);
        this.state = { 
            thread: { } as Thread
        };
    }

    public render() {
        return (
            <div className="thread-post-form panel panel-primary">
                <div className="panel-heading">
                    <strong>Post a Thread</strong>
                </div>
                <div className="panel-body">
                    <input type="text" className="form-control" name="author" placeholder="Your Name" value={this.state.thread.author} onChange={event => this.handleInputChange(event)} /><br />
                    <input type="text" className="form-control" name="content" placeholder="Your Comment" value={this.state.thread.content} onChange={event => this.handleInputChange(event)} /><br />
                    <button className="btn btn-primary" onClick={() => this.save()}>Save</button>
                </div>
            </div>
        );
    }

    private save() {
        this._threadApiService.create(this.state.thread).then(() => {
            this.clear();
            this.props.onThreadCreate();
        });
    }

    private clear() {
        this.setState({
            thread: { } as Thread
        });
    }

    private handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target["type"] === 'checkbox' ? target["checked"] : target["value"];
        const name = target["name"];

        let thread = this.state.thread;
        thread[name] = value;

        console.log("Setting new thread one state:", thread);

        this.setState({
            thread
        });
    }
}