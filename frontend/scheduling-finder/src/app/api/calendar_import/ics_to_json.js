const NEW_LINE = /\r\n|\n|\r/;

const EVENT = "VEVENT";
const EVENT_START = "BEGIN";
const EVENT_END = "END";
const START_DATE = "DTSTART";
const FREQUENCY = "RRULE"
const END_DATE = "DTEND";
const DESCRIPTION = "DESCRIPTION";
const SUMMARY = "SUMMARY";
const ALARM = "VALARM";
const NUM = "NUM";

const keyMap = {
  [START_DATE]: "startDate",
  [END_DATE]: "endDate",
  [SUMMARY]: "courseName",
  [NUM]: "courseNum",
  [FREQUENCY] : "frequency"
};

const dateMap = {
  ["SU"] : 0,
  ["MO"] : 1, 
  ["TU"] : 2,
  ["WE"] : 3, 
  ["TH"] : 4, 
  ["FR"] : 5,
  ["SA"] : 6
}

const clean = string => unescape(string).trim();

const icsToJson = icsData => {
  const array = [];
  let currentObj = {};
  let lastKey = "";

  const lines = icsData.split(NEW_LINE);

  let isAlarm = false;
  for (let i = 0, iLen = lines.length; i < iLen; ++i) {
    const line = lines[i];
    const lineData = line.split(/:(.*)/s);

    let key = lineData[0];
    const value = lineData[1];

    if (key.indexOf(";") !== -1) {
      const keyParts = key.split(";");
      key = keyParts[0];
      // Maybe do something with that second part later
    }

    if (lineData.length < 2) {
      if (key.startsWith(" ") && lastKey !== undefined && lastKey.length) {
        currentObj[lastKey] += clean(line.substr(1));
      }
      continue;
    } else {
      lastKey = keyMap[key];
    }

    switch (key) {
      case EVENT_START:
        if (value === EVENT) {
          currentObj = {};
        } else if (value === ALARM) {
          isAlarm = true;
        }
        break;
      case EVENT_END:
        isAlarm = false;
        if (value === EVENT) array.push(currentObj);
        break;
      case FREQUENCY:
        let freq = value.split(";")[2];
        freq = freq.substring(6);
        const date = freq.split(",");
        let date_list = [];
        // console.log(date);
        // console.log("DATEMAP TEST: " + date[0]);
        for(let i = 0; i< date.length; i++){
          date_list.push(dateMap[date[i]]);
        } 
        currentObj[keyMap[FREQUENCY]] = date_list;
        break;
      case START_DATE:
        currentObj[keyMap[START_DATE]] = value.substring(9);
        break;
      case END_DATE:
        currentObj[keyMap[END_DATE]] = value.substring(9);
        break;
      case SUMMARY:
        const courseValue = value.split(/::(.*)/s);
        currentObj[keyMap[SUMMARY]] = clean(courseValue[0]);
        currentObj[keyMap[NUM]] = clean(courseValue[1]).substring(0, 5);
        break;
      default:
        continue;
    }
  }
  return array;
};

export default icsToJson;