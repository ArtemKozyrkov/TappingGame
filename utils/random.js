import {Dimensions} from "react-native";

const windowHeights = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
    let yPosTop = -getRandom(300, windowHeights - 100);

    const pipeTop = {
        pos: {
            x: windowWidth + addToPosX,
            y: yPosTop
        },
        size: {
            height: windowHeights * 2,
            width: 75
        }
    };
    const pipeBottom = {
        pos: {
            x: windowWidth + addToPosX,
            y: windowHeights * 2 + 200 + yPosTop
        },
        size: {
            height: windowHeights * 2,
            width: 75
        }
    };

    return {
        pipeTop,
        pipeBottom
    };
};