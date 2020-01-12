var friends = require('../data/friends');
var differenceScores = [];

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {

        var bestMatch = {
            name: '',
            photo: '',
            friendDifference: 0
        };

        let userData = req.body;
        let userScores = userData.score;

        var totalDifference;
        let friendIndex;

        for (let i = 0; i < friends.length; i++) {
            let currentFriend = friends[i];
            totalDifference = 0;

            console.log("WE ARE HERE");
            console.log(currentFriend);
            for (let j = 0; j < currentFriend.score.length; j++) {
                var currentFriendScore = currentFriend.score[j];
                var currentUserScore = parseInt(userScores[j]);

                totalDifference +=
                    Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));


            }
            differenceScores.push(totalDifference);

            let leastDifference = differenceScores[0];

            for (let i = 0; i < differenceScores.length; i++) {
                if (differenceScores[i] < leastDifference) {
                    leastDifference = differenceScores[i];
                }
            }

            friendIndex = differenceScores.indexOf(leastDifference);
            console.log(friendIndex);
        }

        bestMatch.name = friends[friendIndex].name;
        bestMatch.photo = friends[friendIndex].name;

        friends.push(userData);
        res.json(bestMatch);
    });
};