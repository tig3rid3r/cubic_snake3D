const rollForward = () =>{
    //positions_assignment
    previousPos.xsP = currentPos.xsP;
    previousPos.ysP = currentPos.ysP;
    previousPos.zsP = currentPos.zsP;
    //wall_cases:
    if (currentPos.zsP > -25 && currentPos.zsP < 25 && currentPos.ysP === 25){
        currentPos.zsP += 5;
    }
    else if(currentPos.zsP > -25 && currentPos.zsP < 25 && currentPos.ysP === -25){
        currentPos.zsP -= 5;
    }
    else if(currentPos.ysP < 25 && currentPos.ysP > -25 && currentPos.zsP === 25){
        currentPos.ysP -= 5;
    }
    else if(currentPos.ysP < 25 &&  currentPos.ysP > -25 && currentPos.zsP === -25){
        currentPos.ysP += 5;
    }
    //corner_edge_cases:
    else if(currentPos.ysP === 25 && currentPos.zsP === 25){
        currentPos.ysP -= 5;
    }
    else if(currentPos.ysP === 25 && currentPos.zsP === -25){
        currentPos.zsP += 5;
    }
    else if(currentPos.ysP === -25 && currentPos.zsP === 25){
        currentPos.zsP -= 5;
    }
    else if(currentPos.ysP === -25 && currentPos.zsP === -25){
        currentPos.ysP += 5;
    }
}
const rollBackward = () =>{
    //positions_assignment
    previousPos.xsP = currentPos.xsP;
    previousPos.ysP = currentPos.ysP;
    previousPos.zsP = currentPos.zsP;
    //wall_cases:
    if (currentPos.zsP > -25 && currentPos.zsP < 25 && currentPos.ysP === 25){
        currentPos.zsP -= 5;
    }
    else if(currentPos.zsP > -25 && currentPos.zsP < 25 && currentPos.ysP === -25){
        currentPos.zsP += 5;
    }
    else if(currentPos.ysP < 25 && currentPos.ysP > -25 && currentPos.zsP === 25){
        currentPos.ysP += 5;
    }
    else if(currentPos.ysP < 25 &&  currentPos.ysP > -25 && currentPos.zsP === -25){
        currentPos.ysP -= 5;
    }
    //corner_edge_cases:
    else if(currentPos.ysP === 25 && currentPos.zsP === 25){
        currentPos.zsP -= 5;
    }
    else if(currentPos.ysP === 25 && currentPos.zsP === -25){
        currentPos.ysP -= 5;
    }
    else if(currentPos.ysP === -25 && currentPos.zsP === 25){
        currentPos.ysP += 5;
    }
    else if(currentPos.ysP === -25 && currentPos.zsP === -25){
        currentPos.zsP += 5;
    }
}
const pitchForward = () =>{
    //positions_assignment
    previousPos.xsP = currentPos.xsP;
    previousPos.ysP = currentPos.ysP;
    previousPos.zsP = currentPos.zsP;
    //wall_cases:
    if (currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === 25){
        currentPos.xsP += 5;
    }
    else if(currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === -25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.zsP < 25 && currentPos.zsP > -25 && currentPos.xsP === 25){
        currentPos.zsP -= 5;
    }
    else if(currentPos.zsP < 25 &&  currentPos.zsP > -25 && currentPos.xsP === -25){
        currentPos.zsP += 5;
    }
    //corner_edge_cases:
    else if(currentPos.xsP === 25 && currentPos.zsP === 25){
        currentPos.zsP -= 5;
    }
    else if(currentPos.xsP === 25 && currentPos.zsP === -25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.xsP === -25 && currentPos.zsP === 25){
        currentPos.xsP += 5;
    }
    else if(currentPos.xsP === -25 && currentPos.zsP === -25){
        currentPos.zsP += 5;
    }
}
const pitchBackward = () =>{
    //positions_assignment
    previousPos.xsP = currentPos.xsP;
    previousPos.ysP = currentPos.ysP;
    previousPos.zsP = currentPos.zsP;
    //wall_cases:
    if (currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === 25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === -25){
        currentPos.xsP += 5;
    }
    else if(currentPos.zsP < 25 && currentPos.zsP > -25 && currentPos.xsP === 25){
        currentPos.zsP += 5;
    }
    else if(currentPos.zsP < 25 &&  currentPos.zsP > -25 && currentPos.xsP === -25){
        currentPos.zsP -= 5;
    }
    //corner_edge_cases:
    else if(currentPos.xsP === 25 && currentPos.zsP === 25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.xsP === 25 && currentPos.zsP === -25){
        currentPos.zsP += 5;
    }
    else if(currentPos.xsP === -25 && currentPos.zsP === 25){
        currentPos.zsP -= 5;
    }
    else if(currentPos.xsP === -25 && currentPos.zsP === -25){
        currentPos.xsP += 5;
    }
}
const yawForward = () =>{
    //positions_assignment
    previousPos.xsP = currentPos.xsP;
    previousPos.ysP = currentPos.ysP;
    previousPos.zsP = currentPos.zsP;
    //wall_cases:
    if (currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.ysP === 25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.ysP === -25){
        currentPos.xsP += 5;
    }
    else if(currentPos.ysP < 25 && currentPos.ysP > -25 && currentPos.xsP === 25){
        currentPos.ysP += 5;
    }
    else if(currentPos.ysP < 25 &&  currentPos.ysP > -25 && currentPos.xsP === -25){
        currentPos.ysP -= 5;
    }
    //corner_edge_cases:
    else if(currentPos.xsP === 25 && currentPos.ysP === 25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.xsP === 25 && currentPos.ysP === -25){
        currentPos.ysP += 5;
    }
    else if(currentPos.xsP === -25 && currentPos.ysP === 25){
        currentPos.ysP -= 5;
    }
    else if(currentPos.xsP === -25 && currentPos.ysP === -25){
        currentPos.xsP += 5;
    }
}
const yawBackward = () =>{
    //positions_assignment
    previousPos.xsP = currentPos.xsP;
    previousPos.ysP = currentPos.ysP;
    previousPos.zsP = currentPos.zsP;
    //wall_cases:
    if (currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.ysP === 25){
        currentPos.xsP += 5;
    }
    else if(currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.ysP === -25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.ysP < 25 && currentPos.ysP > -25 && currentPos.xsP === 25){
        currentPos.ysP -= 5;
    }
    else if(currentPos.ysP < 25 &&  currentPos.ysP > -25 && currentPos.xsP === -25){
        currentPos.ysP += 5;
    }
    //corner_edge_cases:
    else if(currentPos.xsP === 25 && currentPos.ysP === 25){
        currentPos.ysP -= 5;
    }
    else if(currentPos.xsP === 25 && currentPos.ysP === -25){
        currentPos.xsP -= 5;
    }
    else if(currentPos.xsP === -25 && currentPos.ysP === 25){
        currentPos.xsP += 5;
    }
    else if(currentPos.xsP === -25 && currentPos.ysP === -25){
        currentPos.ysP += 5;
    }
}