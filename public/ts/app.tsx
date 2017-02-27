import React from "react";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{}, {}> { }

export class App extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}