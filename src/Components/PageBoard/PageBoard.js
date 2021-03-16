import React from 'react';
import { Link } from 'react-router-dom';
import LimitedCard from '../LimitedCard/LimitedCard';


export default class PageBoard extends React.Component {
    constructor(props) {
        super(props);
        const bridgeImgNames = { 1: "1", 2: "2", 3: "3", 4: "4" };
        this.state = {
            // 如果图片不存在就返回NULL
            imgList: Object.keys(bridgeImgNames).map((item) => { try { return require("./" + this.props.pageName + "/" + item + ".jpg") } catch (e) { return null } })
        };
    }

    isEmptyObject(obj) {
        for (var n in obj) { return false }
        return true;
    }

    render() {
        return (
            <div className="paper">
                <div className="section">
                    <h2 style={{ margin: '0' }} >{this.props.pageNumber} <span style={{ fontSize: '80%' }}>{this.props.pageName}</span> </h2>
                    <div className="sm-12 md-12 col">
                        <div className="container-lg" style={{ background: '#0071de', textAlign: "center", color: 'white', padding: '5%' }}>
                            <h3>{this.props.pageNumber} <span style={{ fontSize: '80%' }}>{this.props.pageName}</span></h3>
                            <Link to={{ pathname: "/" + this.props.pageUrl, state: { pageNumber: this.props.number, pageName: this.props.name, } }}>
                                <button className="btn-small" style={{ background: '#0071de', borderRadius: '20%', borderColor: 'white', borderWidth: '0.2rem', color: 'white', fontWeight: 'bold' }}>Let's Start</button>
                            </Link>
                        </div>
                    </div>
                    <div className="sm-12 md-12 col">
                        <h3 style={{ color: '#0071de', fontWeight: 'bold' }}>In Our Shop</h3>
                        <div className="row flex-spaces">
                            {
                                this.state.imgList.map((v, i) => {
                                    if (!this.isEmptyObject(v)) { return <div key={i} className="col sm-3 md-3"><LimitedCard key={i} img={v} price="10" pageUrl={this.props.pageUrl} /></div> }
                                    else { return <div key={i}></div> }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
