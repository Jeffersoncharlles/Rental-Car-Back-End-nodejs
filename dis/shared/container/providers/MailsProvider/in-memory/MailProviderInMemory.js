"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailProviderInMemory = void 0;

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 19:41:10
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:22:35
 */
class MailProviderInMemory {
  constructor() {
    this.message = [];
  }

  async sendMail(to, subject, variables, path) {
    this.message.push(to, subject, variables, path);
  }

}

exports.MailProviderInMemory = MailProviderInMemory;