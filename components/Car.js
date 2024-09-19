import React from 'react'
import Matter from "matter-js";
import { Image } from 'react-native';

const Car = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;

    return (
        <Image
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody
            }}
            alt={'alt'}
            source={require('../assets/f1_car.png')}
        />
    )
};

export default (world, pos, size) => {
    const initialCar = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {label: 'Car'}
    );
    Matter.World.add(world, initialCar);

    return {
        body: initialCar,
        pos,
        renderer: <Car/>
    }
}