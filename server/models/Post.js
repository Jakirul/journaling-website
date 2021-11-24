let postData = './data/postData.json'
const fs = require('fs');


class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.gif = data.gif || "";
        this.date = data.date
        this.reaction = data.reaction || {"like": 0, "dislike": 0, "happy": 0}
        this.comment = data.comment || []
    }

    static get allPost() {
        // this read the json file in the data folder
        let data = fs.readFileSync(postData);
        let json = JSON.parse(data)
        return json.map(postEntry => new Post(postEntry))

    }

    static newPost(info) {
       
        fs.readFile(postData, (err, data) => {
            // returns all posts
           
            try {
                let parser = JSON.parse(data);
                const postCreation = new Post(info);
                // Appends the id by 1
                postCreation.id = `${parser.length + 1}`;
                postCreation.date = new Date().toUTCString();
                parser.unshift(postCreation);
                fs.writeFile(postData, JSON.stringify(parser), (error) => {
                    if (error) {
                        console.log(`Cannot write to file - ${error}`);
                    }
                });
            } catch (err) {
                console.error(err, data)
            }

            
        });
    }

    static newComment(request, commentId) {
        fs.readFile(postData, (err, data) => {
            let parser = JSON.parse(data);
            let find = parser.filter(data => {
                return data.id === commentId
            });
            // the filter command returns an array so i have to index 0 to get it or else i'd get undefined
            let postUpdate = new Post(find[0]);
           
            postUpdate.comment.push(request.body.comment);
           
            fs.writeFile(postData, JSON.stringify(parser), (error) => {
                if (error) {
                    console.log(`Cannot write to file - ${error}`);
                }
            });
        });
    }

    static updateReaction(reactions, reactionId, add) {
        fs.readFile(postData, (err, data) => {
            let parser = JSON.parse(data);
            let find = parser.filter(data => {
                return data.id === reactionId
            });

            if (add === 1) {
                let postUpdate = new Post(find[0]);
                postUpdate.reaction[reactions]+=1
            }

            fs.writeFile(postData, JSON.stringify(parser), (error) => {
                if (error) {
                    console.log(`Cannot write to file - ${error}`);
                }
            });
        })
    }

}

module.exports = Post