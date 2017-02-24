import React from "react";
import { inject } from "inversify";
import { ThreadApiService } from "../services";
import { lazyInject } from "../ioc";
import { Thread } from "../models";

interface ThreadViewProps {
    thread: Thread;
}

export class ThreadView extends React.Component<ThreadViewProps, any> {
    public render() {
        return (
            <div className="thread panel panel-default">
                <div className="panel-body">{this.props.thread.content}</div>
                <div className="panel-footer text-right">Posted by {this.props.thread.author}</div>
            </div>
        );
    }
}