"use strict";

var _tsyringe = require("tsyringe");

var _LocalStorageProvider = require("./implementations/LocalStorageProvider");

var _S3StorageProvider = require("./implementations/S3StorageProvider");

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-01 21:53:05
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:15:29
 */
const diskStorage = {
  local: _LocalStorageProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton('StorageProvider', diskStorage[process.env.DISK]);