import React, { Component } from 'react';
import ChosenBoard from '../../Components/ChosenBoard/ChosenBoard';


export default class Page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genesLen: 20, //基因长度
            popmax: 5, // 种群数
            mutationRate: 0.05, // 变异率 
        };
    }


    render() {
        return (
            <div className="paper container container-lg margin-bottom-large">
                <div className="section" style={{ margin: '0 auto'}}>
                    <div style={{ fontSize: '2rem', margin: '0', marginBottom: '2rem', marginTop: '4rem', }}>1. Choose two <span style={{ fontSize: '80%' }}> styles which you love the most</span></div>
                    
                    <div className="container-xs" style={{ width: '80%', margin: '0 auto'}}>
                        {/* <Population num={this.state.popmax} m={this.state.mutationRate}/> */}
                        {/* <Thumbnail /> */}
                        {/* <ChosenBoard shapeList={this.state.shapeList} squareList={this.state.squareList} textureList={this.state.textureList} popmax={this.state.popmax} mutationRate={this.state.mutationRate} /> */}
                        <ChosenBoard genesLen={this.state.genesLen} popmax={this.state.popmax} mutationRate={this.state.mutationRate} />
                    </div>
                </div>
            </div>
        );
    }
}