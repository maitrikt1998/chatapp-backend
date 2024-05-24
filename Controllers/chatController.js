const chatModel = require("../Models/chatModel")

// createChat
// finduserChats
// findChat

const createChat = async(req, res) => {
    const { firstId, secondId } = req.body

    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })

        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        const response = await newChat.save()

        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
};

const findUserChats = async(req, res) => {
    // const userId = req.params.userId
    const userId = req.params.userId;
    
    try{
       const chats = await chatModel.find({
            members: {$in: [userId]},
       });
        res.status(200).json(chats);

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
};

// const findUserChats = async (req, res) => {
//     const { userId } = req.params;

//     console.log(`Received userId: ${userId}`);

//     try {
//         const chats = await chatModel.find({
//             members: userId
//         });

//         if (chats.length === 0) {
//             console.log("No chats found for user");
//             return res.status(404).json({ message: "No chats found for user" });
//         }

//         console.log("Chats found:", chats);
//         res.status(200).json(chats);

//     } catch (error) {
//         console.error("Error finding user chats:", error);
//         res.status(500).json(error);
//     }
// };

const findChat = async(req, res) => {
    const { firstId, secondId } = req.params;

    try{
       const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
       });

        res.status(200).json(chat);

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
};
module.exports = { createChat, findUserChats, findChat };
