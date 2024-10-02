const db = require('../persistence/mysql');

module.exports = async (req, res) => {
    const items = await db.getMarkets();
    res.send(items);
};
