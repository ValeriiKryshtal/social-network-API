const {Schema, mongoose} = require('mongoose');


const reactionSchema = new mongoose.Schema({
     reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
     },
     reactionBody: {
          type: String,
          required: true,
          maxLength: 280
     },
     username: {
          type: String,
          required: true
     },
     createdAt: {
          type: Date,
          default: Date.now
     }
},
{
     toJSON: {
          virtuals: true,
          getters: true
     },
     id: false
});

const thoughtSchema = new mongoose.Schema({
     thoughtText: {
          type: String,
          required: true,
          maxLength: 280
     },
     username: {
          type: String,
          required: true
     },
     createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => new Date(timestamp).toLocaleString()
     },
     reactions: [reactionSchema]
},
{
     toJSON: {
          virtuals: true,
          getters: true
     },
     id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
     return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;