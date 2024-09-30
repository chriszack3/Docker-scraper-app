const db = require('../persistence/mysql');

module.exports = async (req, res) => {
    const items = await db.getHeadlines();
    res.send(items);
};
