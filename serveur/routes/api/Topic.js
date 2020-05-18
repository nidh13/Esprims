const express = require("express");
const router = express.Router();
const Topic = require("../../models/Topic");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

router.get("/", (req, res, next) => {
    Topic.find({}).populate('comments')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});
router.get("/:id", async (req, res) => {
    Topic.find({"_id": req.params.id}).populate('comments')
        .then((data) => {
            res.set('Content-Type', 'text/html');
            res.status(202).send(data);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
});
router.get("/comment/:id", async (req, res) => {
    Comment.find({"_id": req.params.id}).populate('commentedBy')
        .then((data) => {
            res.set('Content-Type', 'text/html');
            res.status(202).send(data);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
});

router.get("/byUser/:id", async (req, res) => {
    Topic.find({"createdBy": req.params.id})
        .then((data) => {
            res.set('Content-Type', 'text/html');
            res.status(202).send(data);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
});
router.post("/add", async (req, res) => {
    Topic.create({
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        createdBy: req.body.user,
        categorie: req.body.categorie,
    })
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);

        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
});
router.post("/addCommentToTopic/:idTopic/:idUser", async (req, res) => {
    const topic = await Topic.findById(req.params.idTopic).populate('comments');
    const userConnected = await User.findById(req.params.idUser);
    Comment.create({
        text: req.body.text,
        commentedBy: userConnected,
        commentedAt: new Date(),
        topic: topic,
    }).then(async (data) => {
        const tp = await Topic.update({"_id": req.params.idTopic}, {"$push": {"comments": data}});
        res.set('Content-Type', 'application/json');
        res.status(202).json(data);
    })
        .catch(error => {
            console.log(error);
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
});
router.get("/commentsByTopicId/:idTopic", async (req, res) => {
    const topic = await Topic.findById(req.params.idTopic).populate('comments');
    console.log(topic);
    var tab = new Array();
    //var comments = await Comment.find({"_id": topic.comments._id}).exec();
    for (const c of topic.comments) {
        const ca = await Comment.findById(c._id).populate("commentedBy");
        console.log(ca);
        tab.push(ca);
    }

    console.log(tab);
    return res.status(200).send(tab);
});
router.get("/deleteComment/:id", async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    console.log(comment.topic);
    const r = await Topic.update({"_id": comment.topic}, {"$pull": {"comments": comment._id}});
    Comment.deleteOne({"_id": comment._id})
        .then(() => {
            res.set('Content-Type', 'text/html');
            res.status(202).send("The comment Was Deleted Successfully !");
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
});
router.get("/deleteTopic/:id", async (req, res) => {
    Topic.deleteOne({"_id": req.params.id})
        .then(() => {
            console.log('ok');
            res.set('Content-Type', 'text/html');
            res.status(202).send("The topic Was Deleted Successfully !");
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
});


router.post("/like/:idComment/:idUser", async (req, res) => {
    const u = await User.find({"_id": req.params.idUser});
    Comment.update({"_id": req.params.idComment}, {"$addToSet": {"likers": u}}).then(async (data) => {
        console.log(data);
        const mm =  await Comment.findOneAndUpdate({"_id": req.params.idComment }, {$pull: { dislikers: req.params.idUser}});
        res.set('Content-Type', 'application/json');
        const c = await Comment.find({"_id": req.params.idComment});
        res.status(202).json(c);
    }, error => {
        res.set('Content-Type', 'application/json');
        res.status(500).send(error);
    });
});
router.post("/dislike/:idComment/:idUser", async (req, res) => {
    const u = await User.find({"_id": req.params.idUser});
    Comment.update({"_id": req.params.idComment}, {"$addToSet": {"dislikers": u}})
        .then(async (data) => {
            const mm =  await Comment.findOneAndUpdate({"_id": req.params.idComment }, {$pull: { likers: req.params.idUser}});
            res.set('Content-Type', 'application/json');
            const c = await Comment.find({"_id": req.params.idComment});
            res.status(202).json(c);
        }, error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
});
module.exports = router;
