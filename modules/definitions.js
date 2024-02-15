let definitions = new Set();

function storeDefinition(req, res) {
    const params = new URLSearchParams(req.url);
    const word = params.get('word');
    if (!word) {
        // TODO reject no word
    } else if (definitions.has(word)) {
        // TODO reject word already exists
    } else {
        definitions.add(word); // TODO definitions....
    }
}

function retrieveDefinition(req, res) {
    // TODO Retrieval
}

module.exports = {
    storeDefinition,
    retrieveDefinition,
};
