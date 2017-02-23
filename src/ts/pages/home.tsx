import React from "react";
import { inject } from "inversify";
import { HackerNewsApi } from "../services/hackerNewsApi";
import { lazyInject } from "../ioc/ioc";

interface HomeState {
    stories: number[];
}

export class Home extends React.Component<any, HomeState> {
    @lazyInject("HackerNewsApi") 
    private _hackerNewsApi: HackerNewsApi

    public constructor(
        props: any
    ) {
        super();
        this.state = {
            stories: []
        };
    }

    public render() {
        return (
            <div>
                <ul>
                    { this.state.stories.map(story => <li>{story}</li>) }
                </ul>
            </div>
        )
    }

    public async componentDidMount() {
        const stories = await this._hackerNewsApi.getTopStories();

        this.setState({
            stories
        });
    }
}