const {Character} = require('./character.js');
const {Food} = require('./food.js');


class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  // Picks up an item from a room into the player's inventory
  takeItem(itemName) {

    // Find the item using find() from room.items & push to player inventory
    const item = this.currentRoom.getItemByName(itemName);
    this.items.push(item);

    // remove item from room by filtering items to those not matching item name
    this.currentRoom.items = this.currentRoom.items.filter(next => next.name !== itemName);

  }

  // Drops an item the player is holding into their current room
  dropItem(itemName) {

    let retrievedItem = this.getItemByName(itemName);
    this.currentRoom.items.push(retrievedItem);

    this.items = this.items.filter(next => next.name !== itemName);

  }

  // food can be eaten by a player
  eatItem(itemName) {
    const item = this.getItemByName(itemName);

    if (item instanceof Food) {
      this.items = this.items.filter(next => next.name !== itemName);
    }
  }

  getItemByName(name) { // filter array of player's items down to one that has the same name

    let itemArray = this.items.filter(item => name === item.name);
    return itemArray[0];

  }

  // Implement the ability for the player to hit the goblin for damage
   hit(name) {
    const enemy = this.currentRoom.getEnemyByName(name);  // get enemy by name

    enemy.attackTarget = this;                            // targets the player when hit

    // enemy.applyDamage(this.strength);
    // enemy.setPlayer(this);

    // console.log(`You hit the ${name} for ${this.strength} damage.`);
    // enemy.cooldown = 0;
    // enemy.attack();
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

  // let room = new Room("Test Room", "A test room");
  // let item = new Item("rock", "just a simple rock");
  // let sandwich = new Food("sandwich", "a delicious looking sandwich");
  // let enemy = new Enemy('enemy', 'an ordinary character', room);
  // let player = new Player("player", room);

  // World.enemies.push(enemy);
  // World.setPlayer(player);

  // enemy.items.push(item);
  // room.items.push(sandwich);

  // console.log(enemy.attackTarget); // => null
  // player.hit('enemy');
  // console.log(enemy.attackTarget); // => player

  // it should attack the player when targeting player

    // player.hit('enemy');
    // enemy.cooldown = 0;
    // console.log(player.health); // => 100
    // enemy.attack();
    // console.log(player.health); // => 90
    // console.log(enemy.cooldown); // => above(0)


/**********************************************************/
module.exports = {
  Player,
};
