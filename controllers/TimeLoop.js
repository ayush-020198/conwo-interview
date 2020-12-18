const TimeLoop = (timeOfJourney) => {

    let newTimeArr = [];
    var j, flag=0;
    // Converting "hh hours mm minutes" to "hh:mm"
    for(j=0; j<timeOfJourney.length; j++){
        if(timeOfJourney[1]==='m' || timeOfJourney[2]==='m') break;
        if((timeOfJourney[j]>='a' && timeOfJourney[j]<='z')){
            flag=1;
            continue;
        }
        if(flag===1) {
            flag=0;
            break;
        }
        newTimeArr.push(parseInt(timeOfJourney[j]));
    }
    newTimeArr.push(':');
    
    if(newTimeArr[1] === ':'){
        newTimeArr.unshift(0);
    }

    while(j<timeOfJourney.length){
        if((timeOfJourney[j]>='a' && timeOfJourney[j]<='z') || timeOfJourney[j]===' '){
            break;
        }
        newTimeArr.push(parseInt(timeOfJourney[j]));
        j++;
    }

    if(newTimeArr.length===3 && newTimeArr[2]===':'){
        newTimeArr.push(0);
        newTimeArr.push(0);
    }

    if(newTimeArr.length<=3 && newTimeArr[0]===':'){
        newTimeArr.splice(0,0,0);
        newTimeArr.splice(0,0,0);
    }

    if(newTimeArr.length===4){
        newTimeArr.splice(3, 0, 0);
    }
    
    return newTimeArr.join().replace(/,/g,""); 

}

module.exports = {
    TimeLoop
}
