import React from 'react';
import {Link} from 'react-router-dom'

const homeImgNames = { 1: "1", 2: "2", 3: "3" }
const homeImgTicks = Object.keys(homeImgNames).map(item => require("./images/" + item + ".jpg"));



class Card extends React.Component {
    render() {
        let imgDisplay
        if (this.props.img) {
            imgDisplay = (
                <img src={this.props.img.default} alt="ss" />
            )
        } else {
            // imgDisplay = (<div class="col sm-12 md-12 border border-primary margin-large background-secondary">Coming soon</div>)
            imgDisplay = (<h3 className="card-title margin-large background-secondary">Coming soon</h3>)
        }

        // let bgGround
        // if (this.props.img) {
        //     bgGround = {
        //         background: `url(${this.props.img.default})`
        //     }
        // } else {
        //     bgGround = {
        //         background: `url(${this.props.img})`
        //     }
        // }

        return (
            <div className="card">
                {/* <div class="card-header">Header</div> */}
                {/* <div class="card-body" style={{height: '80%'}}> */}
                <div className="card-body">
                    {imgDisplay}
                </div>
                <div className="card-footer">
                    <div className="row flex-edges">
                        <h4 style={{ margin: '0' }} >{this.props.number} <span style={{ fontSize: '90%' }}>{this.props.name}</span> </h4>
                        <Link to={{ pathname: "/bridge", state: {pageNumber: this.props.number, pageName: this.props.name, pageUrl: this.props.url} }}>
                            <button className="btn-small">Let's Start</button>
                        </Link>
                    </div>
                </div>
            </div >
        );
    }
}



class Board extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            projectsNum: 9,
            cardsInfo: {
                cardsNumber: ["#001", "#002", "#003", "#004", "#005", "#006", "#007", "#008"],
                cardsName: ["Earing", "Earing1", "Vase", "Furniture", "test", "test", "test", "test"],
                cardsURL:  ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'],
            },
        };
    }

    renderCard(i) {
        return (
            <Card img={homeImgTicks[i]}
                number={this.state.cardsInfo.cardsNumber[i]}
                name={this.state.cardsInfo.cardsName[i]}
                url={this.state.cardsInfo.cardsURL[i]} />
        );
    }

    render() {
        return (
            <div className="paper">
                <div className="section">
                    {/* <Nav /> */}
                    <h4>GENE PLAYGROUND</h4>
                    <div className="row flex-middle">
                        <div className="col sm-3 md-3">
                            {this.renderCard(0)}
                        </div>
                        <div className="col sm-3 md-3">
                            {this.renderCard(1)}
                        </div>
                        <div className="col sm-3 md-3">
                            {this.renderCard(2)}
                        </div>
                        <div className="col sm-3 md-3">
                            {this.renderCard(3)}
                        </div>
                        <div className="col sm-3 md-3">
                            {this.renderCard(4)}
                        </div>
                        <div className="col sm-3 md-3">
                            {this.renderCard(5)}
                        </div>
                        <div className="col sm-3 md-3">
                            {this.renderCard(6)}
                        </div>
                        <div className="col sm-3 md-3">
                            {this.renderCard(7)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default class Home extends React.Component {
    render() {
        return (
            <div id="top" className="row site">
                <div className="sm-12 md-12 col">
                    <Board />
                </div>
            </div>
        );
    }
}

// ========================================