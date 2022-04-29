import {IS_DEBUG_MODE_ACTIVE} from './config.js';

export class Logger {
  static LOG_TYPES = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    TIME: 'TIME',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static stringify = (payload) => {
    let result = '';
    if (payload) {
      try {
        console.log(payload);
        result = ` - ${JSON.stringify(payload)}`;
      } catch (error) {
        Logger.error('Converting circular structure to JSON');
      }
    }
    return result;
  };

  static info = (message, payload) => {
    if (IS_DEBUG_MODE_ACTIVE) {
      console.info(
        `[${Logger.LOG_TYPES.INFO}] - ${message}${Logger.stringify(payload)}`,
      );
    }
  };

  static warning = (message, payload) => {
    if (IS_DEBUG_MODE_ACTIVE) {
      console.info(
        `[${Logger.LOG_TYPES.WARN}] - ${message}${Logger.stringify(payload)}`,
      );
    }
  };

  static error = (message, payload) => {
    if (IS_DEBUG_MODE_ACTIVE) {
      console.info(
        `[${Logger.LOG_TYPES.ERROR}] - ${message}${Logger.stringify(payload)}`,
      );
    }
  };

  static parseTimerName = (name) => `[TIME] - ${name} `;

  static startTimer = (name) => {
    const randomName = Math.random().toString(36).substring(2, 4);
    const label = `${name} - ${randomName}`;
    if (IS_DEBUG_MODE_ACTIVE) {
      console.time(Logger.parseTimerName(label));
    }
    return label;
  };

  static stopTimer = (name) => {
    if (IS_DEBUG_MODE_ACTIVE) {
      console.timeEnd(Logger.parseTimerName(name));
    }
  };
}
