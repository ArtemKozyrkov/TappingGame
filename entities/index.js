import Matter from "matter-js"
import Car from "../components/Car";
import Roof from "../components/Roof";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";

import { Dimensions } from "react-native";
import {getPipeSizePosPair} from "../utils/random";

const windowHeights = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false});

    let world = engine.world;

    world.gravity.y = 0;

    const obstacleCount = Math.floor(windowWidth / 250);

    let startingPos = 0

    const obstacles = {};

    // console.log(obstacleCount);

    const pipeSizePosA = getPipeSizePosPair();
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

    for (let i = 1; i <= 4; i++) {
        const pipeSize = getPipeSizePosPair(startingPos);
        obstacles[`ObstacleTop${i}`] = Obstacle(world, `ObstacleTop${i}`, 'red', pipeSize.pipeTop.pos, pipeSize.pipeTop.size);
        obstacles[`ObstacleBottom${i}`] = Obstacle(world, `ObstacleBottom${i}`, 'blue', pipeSize.pipeBottom.pos, pipeSize.pipeBottom.size);
        startingPos += 250;
    }

    return {
        physics: {engine, world},

        Roof: Roof(world, 'Roof', 'green', {height: 20, width: windowWidth}),

        Car: Car(world,{x: 100, y: 300}, {height: 40, width: 140}),

        // ...obstacles,

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'red', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'blue', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'red', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'blue', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),

        Floor: Floor(world, 'Floor', 'green', {x: windowWidth / 2, y: windowHeights}, {height: 50, width: windowWidth})
    }
}