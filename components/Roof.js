import React from 'react'
import Matter from "matter-js";
import { View } from 'react-native';

const Roof = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

    return (
        <View style={{
            backgroundColor: props.color,
            position: 'absolute',
            left: 0,
            top: 0,
            width: widthBody,
            height: heightBody
        }}/>
    )
};

export default (world, label, color, size) => {
    const initialRoof = Matter.Bodies.rectangle(
        0,
        0,
        size.width,
        size.height,
        {
            label,
            isStatic: true
        }
    );
    Matter.World.add(world, initialRoof);

    return {
        body: initialRoof,
        color,
        renderer: <Roof/>
    }
}