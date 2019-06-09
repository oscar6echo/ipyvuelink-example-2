import d3 from '../assets/d3';

const convertDateStringToUnixTime = function(ymd) {
  const d = new Date(ymd);
  return d.getTime();
};

const convertUnixTimeToDateString = function(ut) {
  const d = new Date(ut);
  return formatDate(d);
};

const formatTimeYMD = d3.timeFormat('%Y-%m-%d');

const formatDate = function(e) {
  return formatTimeYMD(e);
};

const d3FormatFloat = {
  0: d3.format(',.0f'),
  1: d3.format(',.1f'),
  2: d3.format(',.2f'),
  3: d3.format(',.3f')
};

const formatFloat3 = function(e) {
  return d3FormatFloat[3](e);
};

export default {
  convertDateStringToUnixTime,
  convertUnixTimeToDateString,
  formatDate,
  formatFloat3
};
