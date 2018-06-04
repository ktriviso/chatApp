const db = require ('../config/connection');

module.exports = {

  addUser(username, password){
    return db.one(`
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *
    `, [username, password]);
  },

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

  selectMessages(name){
    return db.many(`
      SELECT *
      FROM messages
      WHERE name = $1
    `, name)
  },

  storeMessage(content, name, chatroom){
    return db.one(`
      INSERT INTO messages (content, name, chatroom)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [content, name, chatroom]);
  },

  returnMessagesByChatroom(chatroom){
    return db.many(`
      SELECT *
      FROM messages
      WHERE chatroom = $1
    `, chatroom)
  },

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
