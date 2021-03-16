import React from 'react';
import {Link} from 'react-router-dom';

export default class LimitedCard extends React.Component {
    render() {
        let imgDisplay
        if (this.props.img) {
            imgDisplay = (
                <img src={this.props.img.default} alt="ss" />
            )
        } else {
            // imgDisplay = (<div class="col sm-12 md-12 border border-primary margin-large background-secondary">Coming soon</div>)
            imgDisplay = (<h3 class="card-title margin-large background-secondary">Coming soon</h3>)
        }

        return (
            <div className="card">
                {/* <div class="card-header">Header</div> */}
                {/* <div class="card-body" style={{height: '80%'}}> */}
                <div className="card-body">
                    {imgDisplay}
                </div>
                <div className="card-footer">
                    <div className="row flex-edges">
                        <h4 style={{ margin: '0' }}>${this.props.price} </h4>
                        <Link to={{ pathname: "/" + this.props.pageUrl}}>
                            <button className="btn-small" style={{borderRadius: "50%"}}>+</button>
                        </Link>
                    </div>
                </div>
            </div >
        );
    }
}