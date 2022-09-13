const rabbitmq = require('msgbroker-nxg-cg');
const {log, constants} = require('utils-nxg-cg');
const {awss3} = require('aws-s3-cg-lib');
const {emits} = constants;

/**
 * Method for awss3 connections
 * @param msg
 * @param cfg
 * @param snapshot
 * @returns {Promise<void>}
 */
 module.exports.process = async function awss3Process(msg, cfg, snapshot = {}) {
    try {
        const _data = await awss3(msg, cfg);
        this.emit(emits.data, {data: _data});
        snapshot.lastUpdated = new Date();
        this.emit(emits.snapshot, snapshot);
        log.info(constants.FINISH_EXEC);
        this.emit(emits.end);
    } catch (e) {
        log.error(e);
        this.emit(emits.error, e);
        await rabbitmq.producerErrorMessage(msg.toString(), e.toString());
    }
};