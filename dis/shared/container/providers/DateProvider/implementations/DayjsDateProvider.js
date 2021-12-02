"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayjsDateProvider = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class DayjsDateProvider {
  compareInDays(start, end) {
    const endConvert = this.convertToUtc(end);
    const startConvert = this.convertToUtc(start);
    const compare = (0, _dayjs.default)(endConvert).diff(startConvert, 'day', true);
    return compare;
  }

  dateNow() {
    return (0, _dayjs.default)().toDate();
  }

  convertToUtc(date) {
    return (0, _dayjs.default)(date).utc().local().format();
  }

  compareInHours(start, end) {
    const endConvert = this.convertToUtc(end);
    const startConvert = this.convertToUtc(start);
    const compare = (0, _dayjs.default)(endConvert).diff(startConvert, 'hours', true);
    return compare;
  }

  addDays(days) {
    return (0, _dayjs.default)().add(days, 'days').toDate();
  }

  addHours(hours) {
    return (0, _dayjs.default)().add(hours, 'hours').toDate();
  }

  compareIfBefore(start, end) {
    return (0, _dayjs.default)(start).isBefore(end);
  }

}

exports.DayjsDateProvider = DayjsDateProvider;