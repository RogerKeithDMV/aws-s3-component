const rabbitmq = require('msgbroker-nxg-cg');
const {constants} = require('utils-nxg-cg');
const {awss3} = require('aws-s3-cg-lib');
const {emits} = constants;
const {loging_elastic} = require('loging-elastic-cg-lib');
const {createSum, checkSumMD5} = require("md5-node-cg-lib");
const {log_levels} = constants;

/**
 * Method for awss3 connections
 * @param msg
 * @param cfg
 * @param snapshot
 * @returns {Promise<void>}
 */
 module.exports.process = async function awss3Process(msg, cfg, snapshot = {}) {
    try {
        loging_elastic(constants.START_EXEC, log_levels.debug);
        const md5_source = checkSumMD5(msg, cfg);

        if (md5_source) {
            const {result, flag} = await awss3(msg, cfg);
            const data = {
                content: result
            }
            const md5sum = createSum(result, flag);
            if (md5sum)
                data.md5sum = md5sum;
            this.emit(emits.data, {data});
            snapshot.lastUpdated = new Date();
            this.emit(emits.snapshot, snapshot);
            loging_elastic(constants.FINISH_EXEC, log_levels.debug);
            this.emit(emits.end);
        }else
            throw Error(constants.ERROR_MD5);
    } catch (e) {
        this.emit(emits.error, e);
        loging_elastic(e, log_levels.error);
        rabbitmq.producerErrorMessage(msg,e);
    }
};