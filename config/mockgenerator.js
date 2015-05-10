/**
 * Created by leonid.raizmen on 19/04/2015.
 */
var jsongen = require('jsongen');

function createMockUsers() {

    var users = jsongen([
        '{{repeat(100)}}',
        {
            name: '{{name()}}',
            id: '{{id("user")}}',
            email: '{{email()}}',
            address: '{{num(1,99)}} {{street()}}, {{city()}}',
            posts: [
                '{{repeat(0,3)}}',
                {
                    content: '{{lorem()}}',
                    created: '{{date()}}'
                }
            ],
            status: '{{rand("new", "processing", "registered")}}',
            user_data: function () {
                var rep = this.num(0, 1000),
                    userType = 'bronze';
                if (rep >= 300) userType = 'silver';
                if (rep >= 800) userType = 'gold';
                return {
                    type: userType,
                    reputation: rep
                }
            }
        }
    ]);

    return users;
}

module.exports = {
    createMockUsers : createMockUsers
}