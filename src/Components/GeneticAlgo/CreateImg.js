import React from 'react';
import useImage from 'use-image';
import { Image,  Group } from 'react-konva';



function MyMap(x, xLow, xUp, yLow, yUp) {
  // 将x映射到y
  return yLow + ((x - xLow) * (yUp - yLow) / (xUp - xLow));
}



// example of functional component
function LoadImage(props) {
  const [image] = useImage(props.img.default);

  return (
    <Image
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      image={image}
    />
  );
};



export default class CreateImg extends React.Component {
  render() {
    const styleNum = this.props.shapeImgs.length;
    const shapeStyle = this.props.shapeImgs[Math.floor(this.props.DNA[0] * styleNum)];
    const shapeSize = MyMap(this.props.DNA[0], 0, 1, this.props.shapeInterval[0], this.props.shapeInterval[1]);
    const shapeY = MyMap(this.props.DNA[4], 0, 1, this.props.shapeInterval[2], this.props.shapeInterval[3]);
    const shapeX = MyMap(this.props.DNA[9], 0, 1, this.props.shapeInterval[4], this.props.shapeInterval[5]);

    const squareStyle = this.props.squareImgs[Math.floor(this.props.DNA[1] * styleNum)];
    const squareSize = MyMap(this.props.DNA[0], 0, 1, this.props.squareInterval[0], this.props.squareInterval[1]);
    // const squareY = 35;
    const squareY = MyMap(this.props.DNA[0], 0, 1, this.props.squareInterval[2], this.props.squareInterval[3]);
    const squareX = MyMap(this.props.DNA[3], 0, 1, this.props.squareInterval[4], this.props.squareInterval[5]);

    const textureStyle = this.props.textureImgs[Math.floor(this.props.DNA[4] * styleNum)];
    const textureSize = MyMap(this.props.DNA[5], 0, 1, this.props.textureInterval[0], this.props.textureInterval[1]);
    // const textureY = 35;
    const textureY = MyMap(this.props.DNA[6], 0, 1, this.props.textureInterval[2], this.props.textureInterval[3]);
    const textureX = MyMap(this.props.DNA[7], 0, 1, this.props.textureInterval[4], this.props.textureInterval[5]);

    return (
      <Group>
        <LoadImage img={shapeStyle}
          x={shapeX + this.props.x}
          y={shapeY + this.props.y}
          width={shapeSize}
          height={shapeSize} />

        <LoadImage img={squareStyle}
          x={squareX + this.props.x}
          y={squareY + this.props.y}
          width={squareSize}
          height={squareSize} />

        <LoadImage img={textureStyle}
          x={textureX + this.props.x}
          y={textureY + this.props.y}
          width={textureSize}
          height={textureSize} />
      </Group>
    );
  }
}