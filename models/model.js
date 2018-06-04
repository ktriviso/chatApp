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

  checkRoomsExistence(sender, recipient) {
    return db.one(`
      SELECT *
      FROM chatroom
      WHERE sender = $1
      AND recipient = $2
    `, [sender, recipient])
  },

  createReference(chatroom, username){
    return db.one(`
      INSERT INTO reference (chatroom, username)
      VALUES($1, $2)
      RETURNING *
    `, [chatroom, username]);
  },

  returnReferences(username){
    return db.many(`
      SELECT chatroom
      FROM reference
      WHERE username = $1
    `, username);
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
  createChatroom(name, sender, recipient) {
    return db.one(`
      INSERT INTO chatroom (name, sender, recipient)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [name, sender, recipient]);
  },

  viewChatroom(name) {
    return db.one(`
      SELECT * from chatroom
      WHERE name = $1
    `, name)
  }

}
