class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    console.log("You died");
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.currentRoom.items.push(item);
    }
    this.items = [];
    this.currentRoom = null;
  }
}

// let room =  new Room("Test Room", "A test room");
// let item = new Item("rock", "just a simple rock");
// let character = new Character('Character', 'an ordinary character', room);
// character.items.push(item);

// console.log(character.name);
// console.log(character.description);
// console.log(character.health);
// console.log(character.strength);
// character.applyDamage(10);
// console.log(character.health);
// // should drop all held items and have currentRoom set to null when dead
// console.log(character.currentRoom); // ==> room
// console.log(room.items.length); // => 0
// character.die();
// console.log(character.currentRoom); // => null
// console.log(room.items.length); // => 1
// console.log(room.items[0]); // => item

/***************************************************/
module.exports = {
  Character,
};
