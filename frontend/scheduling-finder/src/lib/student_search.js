import "./class_functions"
import "./group_functions"
import "./user_functions"
import { getUserData } from "./user_functions";

//time stored as an int
//student_list is a list of strings (names)
//returns a list of kvp. first is number of hours in common, second is a list of students

function matchDay(time1, time2, lo, hi){
    //ret is an array of half hour intervals where both are free
    let ret = {};
    for(let i = lo; i<hi; i++){
        if(time1[i] && time2[i]){
            ret.push(i);
        }
    }
    return ret;
}

//array of 7, each item is a list of 30min periods
function matchWeek(time1, time2, lo, hi){
    let ret = {};
    for(let i = 0; i<7; i++){
        ret.push(matchDay(time1[i], time2[i], lo, hi));
    }
    return ret;
}

function getMatchesCnt(matchTimes){
    let ret = 0;
    for(let i = 0; i<7; i++){
        ret += matchTimes.length;
    }
    return ret;
}

function studentSearch(time, student_list, lo, hi){
    let ret = {};
    for(let i = 0; i< student_list.length; i++){
        let data = getUserData(student_list[i]);
        let val = 0;
        //days of the week 
        let student = getUserData(student_list[i]);
        let matches = matchWeek(time, student.times, lo, hi);
        let matchCnt = getMatchesCnt(matches);
        if(ret[matchCnt] == undefined){
            ret[matchCnt] = [];
        }
        ret[matchCnt].push(student_list[i]);
    }
}