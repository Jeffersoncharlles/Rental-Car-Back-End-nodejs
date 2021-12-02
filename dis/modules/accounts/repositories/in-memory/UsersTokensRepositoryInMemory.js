"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/UserTokens");

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 18:29:03
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:28:31
 */
class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async findById(user_id) {
    return this.usersTokens.find(ut => ut.user_id === user_id);
  }

  async create({
    user_id,
    refresh_token,
    expires_date
  }) {
    const user = new _UserTokens.UserTokens();
    Object.assign(user, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(user);
    return user;
  }

  async findByUserIdAndToken(user_id, token) {
    const userToken = this.usersTokens.find(u => u.user_id === user_id && u.refresh_token === token);
    return userToken;
  }

  async deleteByID(id) {
    const token = this.usersTokens.find(ut => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(token));
  }

  async findByRefreshToken(refresh_token) {
    return this.usersTokens.find(ut => ut.refresh_token === refresh_token);
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;