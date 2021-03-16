import React, { Component } from 'react';
import PageBoard from '../../Components/PageBoard/PageBoard';


export default class Bridge extends Component {
    render() {
        return (
            <div id="top" className="row site">
                <div className="sm-12 md-12 col">
                    <PageBoard pageNumber={this.props.location.state.pageNumber} pageName={this.props.location.state.pageName} 
                    pageUrl={this.props.location.state.pageUrl}/>
                </div>
            </div>
        );
    }
}