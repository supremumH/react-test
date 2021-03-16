import React from 'react';
import CreateImg from '../GeneticAlgo/CreateImg';
import { Layer, Stage, Rect, Text } from 'react-konva';
import { genMatingPool, reproduction } from '../GeneticAlgo/GeneticAlgo';



function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



const SaveImages = (props) => {
    // const width = props.width * 2;
    // const height = props.height * 2;

    const stageRef = React.useRef(null);

    // const imgNeedSave = (
    //     <Stage width={width} height={height} ref={stageRef}>
    //         <Layer>
    //             {props.favoCanvas}
    //         </Layer>
    //     </Stage>
    // )


    const handleExport = () => {
        const uri = stageRef.current.toDataURL({ pixelRatio: 3 });
        // console.log(uri);
        // we also can save uri as file
        // but in the demo on Konva website it will not work
        // because of iframe restrictions
        // but feel free to use it in your apps:
        downloadURI(uri, 'myImage.png');
    };

    return (
        <div>
            <button className="btn-middle" onClick={handleExport} >Save Image</button>
            <div style={{ display: 'none' }}>
                <Stage width={props.width} height={props.height} ref={stageRef}>
                    <Layer>
                        <CreateImg x={0} y={0}
                            DNA={props.DNA}
                            shapeImgs={props.shapeImgs} squareImgs={props.squareImgs} textureImgs={props.textureImgs}
                            shapeInterval={props.shapeInterval} squareInterval={props.squareInterval} textureInterval={props.textureInterval}
                        />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};



// 方框
class ChosenRect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            border: true,  //鼠标
        }
    }

    switchBorder() {
        this.setState({ border: !this.state.border });
        // console.log(this.state);
    }

    render() {
        return (
            <Rect
                x={this.props.x}
                y={this.props.y}
                width={this.props.imgSize}
                height={this.props.imgSize}
                fill={'transparent'}
                shadowBlur={20}
                onMouseOver={this.switchBorder.bind(this)}
                onMouseOut={this.switchBorder.bind(this)}
                onTouchEnd={() => this.props.handleChangeFitness()}
                // onTouchEndCapture={() => this.props.handleChangeFitness()}
                onClick={() => this.props.handleChangeFitness()}
                strokeWidth={this.state.border ? 2 : 5} //描边的宽度
                stroke={this.state.border ? 'black' : '#0071de'} //描边的颜色
                style={{cursor:'pointer'}}
            />)
    }
}


// fitness展示
class TextShow extends React.Component {
    render() {
        return (
            <Text
                x={(this.props.x) + (this.props.imgSize / 2.3)}
                y={this.props.y + this.props.imgSize * 1.2}
                text={this.props.fitness}
                fontSize={this.props.imgSize * 0.3}
                fontFamily={'Calibri'}
                fill={'#0071de'}
            />)
    }
}



export default class ChosenBoard extends React.Component {
    constructor(props) {
        super(props);
        const shapeImgNames = {
            1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10",
            11: "11", 12: "12", 13: "13", 14: "14", 15: "15"
        };
        const squareImgNames = shapeImgNames;
        const textureImgNames = shapeImgNames;
        const shapeImgTicks = Object.keys(shapeImgNames).map(item => { try { return require("./pic/shape_" + item + ".png") } catch (e) { return null } });
        const squareImgTicks = Object.keys(squareImgNames).map(item => { try { return require("./pic/square_" + item + ".png") } catch (e) { return null } });
        const textureImgTicks = Object.keys(textureImgNames).map(item => { try { return require("./pic/texture_" + item + ".png") } catch (e) { return null } });

        // DNA List
        var populationList = new Array(this.props.popmax); // 个体
        for (var idx = 0; idx < populationList.length; idx++) {
            populationList[idx] = new Array(this.props.genesLen);
            for (var DNAIdx = 0; DNAIdx < this.props.genesLen; DNAIdx++) {
                populationList[idx][DNAIdx] = Math.random();
            }
        }

        this.state = {
            imgSize: 140,
            rowShow: Math.ceil(this.props.popmax / 2),
            // population List
            population: populationList,
            // max fitness
            maxFitness: 1,
            maxFitIdx: 0,
            // fitness List
            fitnessList: Array(this.props.popmax).fill(1),
            // generations
            generations: 1,
            offset: 2.5, // 控制方框间距

            shapeImgs: shapeImgTicks,
            squareImgs: squareImgTicks,
            textureImgs: textureImgTicks,

            shapeInterval: [80, 130, -10, 35, -5, 35], // loading img size=[80,130] y=[-50,15] x=[-50,15],
            squareInterval: [90, 120, -10, 35, -5, 40],
            textureInterval: [80, 120, -10, 35, -5, 40],
        };

    }

    handleNextGen() {
        let matingPool = genMatingPool(this.state.population, this.state.maxFitness, this.state.fitnessList);
        let newPopulationList = reproduction(this.state.population, matingPool, this.props.mutationRate);
        let fitnessList = Array(this.props.popmax).fill(1);
        this.setState({ fitnessList: fitnessList });
        this.setState({ generations: this.state.generations + 1 });
        this.setState({ population: newPopulationList });
        // console.log(this.state.generations);
    }

    handleChangeFitness(idx) {
        const fitnessList = this.state.fitnessList.slice();
        fitnessList[idx] += 1;
        this.setState({ fitnessList: fitnessList });
        if (fitnessList[idx] > this.state.maxFitness) {
            this.setState({ maxFitness: fitnessList[idx] });
            this.setState({ maxFitIdx: idx });
        }
    }

    renderCanvasShow(idx, imgX, imgY) {
        return (
            <CreateImg x={imgX} y={imgY}
                DNA={this.state.population[idx]}
                shapeImgs={this.state.shapeImgs} squareImgs={this.state.squareImgs} textureImgs={this.state.textureImgs}
                shapeInterval={this.state.shapeInterval} squareInterval={this.state.squareInterval} textureInterval={this.state.textureInterval}
                key={idx}
            />
        );
    }

    renderChosenRect(idx, imgX, imgY) {
        return (
            <ChosenRect
                x={imgX} y={imgY} imgSize={this.state.imgSize}
                handleChangeFitness={() => this.handleChangeFitness(idx)}
                key={idx}
            />
        )
    }

    renderSaveImages() {
        // console.log(maxFitIdx)
        // return (<SaveImages width={this.state.imgSize} height={this.state.imgSize} favoCanvas={canvasList[maxFitIdx]} />);
        return (<SaveImages width={this.state.imgSize} height={this.state.imgSize}
            DNA={this.state.population[this.state.maxFitIdx]}
            shapeImgs={this.state.shapeImgs} squareImgs={this.state.squareImgs} textureImgs={this.state.textureImgs}
            shapeInterval={this.state.shapeInterval} squareInterval={this.state.squareInterval} textureInterval={this.state.textureInterval}

        />);
    }


    render() {
        var canvasList = [];
        var chosenRectList = [];
        var textShowList = [];

        for (var idx = 0; idx < this.props.popmax; idx++) {
            let imgX = (10 + idx * 75) * this.state.offset;
            let imgY = 60 * this.state.offset;
            canvasList.push(this.renderCanvasShow(idx, imgX, imgY));
            chosenRectList.push(this.renderChosenRect(idx, imgX, imgY));
            textShowList.push(
                <TextShow
                    x={imgX} y={imgY} imgSize={this.state.imgSize}
                    fitness={this.state.fitnessList[idx]}
                    key={new Date().getTime() + '3' + idx}
                />
            );
        }
        // window.innerHeight

        return (
            <div>
                <Stage width={1400} height={400} 
                style={{overflow:'auto',
                overflowY: 'visible',  
                WebkitOverflowScrolling: 'touch',
                }} >
                    <Layer >
                        {canvasList}
                        {textShowList}
                        {chosenRectList}
                    </Layer>
                </Stage>
                <div className={'row flex-spaces'}>
                    <div className={"col sm-3 md-3"}>
                        <button className="btn-middle" onClick={() => this.handleNextGen()}>Next Generation</button>
                    </div>
                    <div className={"col sm-3 md-3"}>
                        {this.renderSaveImages()}
                    </div>
                </div>
            </div >
        );
    }
}