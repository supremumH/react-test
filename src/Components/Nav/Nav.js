import React from 'react';

export default class Nav extends React.Component {
    render() {
        return (
            <nav className="border fixed split-nav">
                <div className="nav-brand">
                    <h3><a href="/#"><span className="badge secondary">GENE PLAYGROUND</span></a></h3>
                </div>
                <div className="collapsible">
                    <input id="collapsible1" type="checkbox" name="collapsible1" />
                    <label htmlFor="collapsible1">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </label>
                    <div className="collapsible-body">
                        <ul className="inline">
                            <li><a href="/#">SHOP</a></li>
                            <li><a href="/#">PLAYGROUND</a></li>
                            <li><a href="/#">ABOUT</a></li>
                        </ul>
                    </div>

                </div>
            </nav>
        );
    }
}