import Matter from "matter-js";
import {getPipeSizePosPair} from "./utils/random";
import {Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine;

    let deltaY = touches.filter(t => t.type === 'move').map(t => t.delta.locationY).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    Matter.Body.setVelocity(entities.Car.body, {
        x: 0,
        y: deltaY > 0 ? 3 : deltaY < 0 ? -3 : 0
    });

    Matter.Engine.update(engine, time.delta);

    for (let index = 1; index <= 2; index++) {
        let speed = entities[`ObstacleTop${index}`].speed;

        if (!speed) {
            entities[`ObstacleTop${index}`].speed = -3;
            speed = -3;
        }

        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 100 && !entities[`ObstacleTop${index}`].point) {
            entities[`ObstacleTop${index}`].point = true;
            entities[`ObstacleTop${index}`].speed -= 0.5;
            dispatch({ type: 'new_point'});
        }

        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
            entities[`ObstacleTop${index}`].point = false;
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
            Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos);
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos);
        }
        Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x: speed, y: 0});
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x: speed, y: 0});
    }

    Matter.Events.on(engine, 'collisionStart', (event) => {
        dispatch({type: 'game_over'});
    });

    return entities;
};

export default Physics;