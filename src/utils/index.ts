import moment from "moment";

export function isMobile(): boolean {
  const u = navigator.userAgent;
  return !!u.match(/AppleWebKit.*Mobile.*/);
}

export function isJSONStr(jsonContent: string): boolean {
  try {
    JSON.parse(jsonContent);
    if (jsonContent.indexOf("{") > -1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function getTrackParam() {
  let searchMap: {
    [K: string]: string;
  } = {};
  let search = decodeURIComponent(location.search);
  search = search.slice(1, search.length);
  search.split("&").map((str) => {
    let key = str.split("=")[0];
    let value = str.split("=")[1];
    if (key.indexOf("cl_") === 0) searchMap[key] = value;
  });
  return searchMap;
}

export function formateDate(date: string, needTime = true): string {
  const today = moment(moment().format("YYYY-MM-DD") + " 00:00:00");
  const tomorrow = moment(moment().format("YYYY-MM-DD") + " 00:00:00").add(
    1,
    "day"
  );
  const yesterday = moment(
    moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00"
  );
  const thisYear = moment(moment().format("YYYY") + "-01-01 00:00:00");
  const selectedDate = moment(date);

  if (selectedDate >= yesterday && selectedDate < today) {
    return needTime ? `昨天 ${selectedDate.format("HH:mm")}` : "昨天";
  } else if (selectedDate >= thisYear && selectedDate < yesterday) {
    return needTime
      ? selectedDate.format("MM月DD日 HH:mm")
      : selectedDate.format("MM月DD日");
  } else if (selectedDate > today && selectedDate < today.add(1, "day")) {
    return needTime ? `今天 ${selectedDate.format("HH:mm")}` : `今天`;
  } else if (selectedDate > tomorrow && selectedDate < tomorrow.add(1, "day")) {
    return needTime ? `明天 ${selectedDate.format("HH:mm")}` : `明天`;
  } else {
    return needTime
      ? selectedDate.format("YYYY年MM月DD日 HH:mm")
      : selectedDate.format("YYYY年MM月DD日");
  }
}

export function formatDateTime(time: string): string {
  if (moment(time) > moment(moment(time).format("YYYY-MM-DD"))) {
    return moment(time).format("MM月DD日 HH:mm");
  } else {
    return moment(time).format("YYYY年MM月DD日 HH:mm");
  }
}

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = Math.floor(duration % 60);
  return `${hours ? `${hours}小时` : ""}${mins ? `${mins}分钟` : ""}${
    secs ? `${secs}秒` : ""
  }`;
}

export function formatVideoDuration(time: number): string {
  const d = Math.floor(time);
  if (!d || isNaN(d)) {
    return `00:00:00`;
  }
  const prefixZero = (t: string | number) => (t > 9 ? t : "0" + t);
  let hour = 0;
  let minute = 0;
  let second = 0;
  hour = Math.floor(d / 3600);
  minute = Math.floor((d - hour * 3600) / 60);
  second = Math.floor(d - hour * 3600 - minute * 60);
  return `${prefixZero(hour)}:${prefixZero(minute)}:${prefixZero(second)}`;
}

export function isEmptyHtml(html: string): boolean {
  let str = html.replace(/\<[^>]*\>(([^<])*)/g, function () {
    return arguments[1];
  });
  return !str && html.indexOf("<img") < 0;
}

export function isWechat(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") != -1;
}


export function decodeSearch(search: string): Record<string, string> {
  const strArr = search.slice(1, search.length).split("&");
  let result: Record<string, string> = {};
  strArr.map((str) => {
    result[str.split("=")[0]] = str.split("=")[1];
  });

  return result;
}