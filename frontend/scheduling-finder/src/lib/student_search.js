import "./class_functions"
import "./group_functions"
import "./user_functions"
import { getUserData } from "./user_functions";

//time stored as an int
//student_list is a list of strings (names)
//returns a list of kvp. first is number of hours in common, second is a list of students

export async function getTimes(student){
    const userData = await getUserData(student)
    let ret = [];
    for(let i = 0; i< 7; i++){
        ret.push([]);
        for(let j = 0; j< 48; j++){
            ret[i].push(userData.times[48*i + j]);
        }
    }   
    return ret;
}

export function matchDay(time1, time2, lo, hi){
    //ret is an array of half hour intervals where both are free
    let ret = [];
    for(let i = lo; i<hi; i++){
        if(time1[i] && time2[i]){
            ret.push(i);
        }
    }
    return ret;
}

//array of 7, each item is a list of 30min periods
export function matchWeek(time1, time2, lo, hi){
    let ret = [];
    for(let i = 0; i<7; i++){
        ret.push(matchDay(time1[i], time2[i], lo, hi));
    }
    return ret;
}

export function getMatchesCnt(matchTimes){
    let ret = 0;
    for(let i = 0; i<7; i++){
        ret += matchTimes[i].length;
    }
    return ret;
}

export async function studentSearch(time, student_list, lo, hi){
    let ret = [];
    for(let i = 0; i< student_list.length; i++){
        let matches = matchWeek(time, await getTimes(student_list[i]), lo, hi);
        let matchCnt = getMatchesCnt(matches);
        if(ret[matchCnt] == undefined){
            ret[matchCnt] = [];
        }
        ret[matchCnt].push(student_list[i]);
    }

    return ret
}