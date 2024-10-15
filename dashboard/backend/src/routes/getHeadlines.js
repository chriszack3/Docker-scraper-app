const db = require('../persistence/mysql');

module.exports = async (req, res) => {
    const items = await db.getHeadlines(req.query.table);
    res.send(items);
};
