const db = require ('../config/connection');

module.exports = {

  // add new user
  // handles the submit from register form
  addUser(username, password){
    return db.one(`
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *
    `, [username, password]);
  },

  // get one existing user
  // for the profile page and login
  getUser(username, password){
    return db.one(`
      SELECT *
      FROM users
      WHERE username=$1
      AND password=$2
    `, [username, password]);
  },

  // creates a reference between users, chatroom, messages
  createReference(chatroom_id, username){
    return db.one(`
      INSERT INTO reference (chatroom_id, username)
      VALUES($1, $2)
      RETURNING *
    `, [chatroom_id, username]);
  },

  // get all from selected chatroom
  returnReferences(chatroom_id){
    return db.many(`
      SELECT *
      FROM reference
      JOIN users ON (reference.username = users.username)
      JOIN chatroom ON (reference.chatroom_id = chatroom.chatroom_id)
      WHERE chatroom_id = $1
    `, chatroom_id);
  },
  //
  // deleteReference(user_id, chatroom_id, message_id){
  //   return db.none(`
  //     DELETE FROM reference
  //     WHERE user_id = $1 AND
  //     WHERE chatroom_id = $2 AND
  //     WHERE message_id = $3
  //   `, [user_id, chatroom_id, message_id])
  // },
  selectMessages(name){
    return db.many(`
      SELECT *
      FROM messages
      WHERE name = $1
    `, name)
  },

  // handle submit messages in any chatroom
  storeMessage(content, name, chatroom){
    return db.one(`
      INSERT INTO messages (content, name, chatroom)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [content, name, chatroom]);
  },
  //
  // editMessage(message_id, content){
  //   return db.one(`
  //     UPDATE messages
  //     SET
  //     content = $2
  //     WHERE message_id = $1
  //     RETURNING *
  //   `, [message_id, content]);
  // },
  //
  // deleteMessage(message_id){
  //   return db.none(`
  //     DELETE FROM messages
  //     WHERE message_id = $1
  //   `, message_id);
  // },

  returnMessagesByChatroom(chatroom){
    return db.many(`
      SELECT *
      FROM messages
      WHERE chatroom = $1
    `, chatroom)
  },

  // create chatroom
  createChatroom(name) {
    return db.one(`
      INSERT INTO chatroom (name)
      VALUES ($1)
      RETURNING *
    `, name);
  },

  viewChatroom(id) {
    return db.one(`
      SELECT * from chatroom
      WHERE chatroom_id = $1
    `, id)
  }

}
