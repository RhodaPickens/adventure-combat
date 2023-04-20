
const {Character} = require("./character.js");


class Enemy extends Character {

  constructor(name, description, currentRoom) {
    super (name, description, currentRoom);
    this.cooldown = 3000;
    this.items = [];
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  // should be able to move to a new room
  randomMove() {
    let exitArr = Object.keys(this.currentRoom.exits); // array of exits

    function getRandomInt(max) {            // get random index from array of exits
      return Math.floor(Math.random() * max);
    }

    let randomExit = exitArr[getRandomInt(exitArr.length)];
    let nextRoom = this.currentRoom.getRoomInDirection(randomExit);
    this.currentRoom = nextRoom;

    this.cooldown += 1000;
    this.act();
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  // enemy should attack the player when targeting player
  attack() {
    this.attackTarget.applyDamage(this.strength);
    console.log(`The ${this.name} hit you for ${this.strength} damage.`);
    this.cooldown += 3000;
    this.act();
  }

  // enemy should lose health when damage is applied
  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    } else {
      this.attackTarget = this.player;
      this.act();
    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
      this.randomMove();
    }

    setTimeout(this.scratchNose, 3000);
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

  // let room = new Room("Test Room", "A test room");
  // let enemy = new Enemy('enemy', 'an ordinary character', room);
  // let westRoom = new Room("West Room", "A room to the west of testRoom");
  // let player = new Player("player", room);


  // it('should attack the player when targeting player', function () {

  //   player.hit('enemy');

  //   enemy.cooldown = 0;

  //   expect(player.health).to.equal(100);
  //   enemy.attack();
  //   expect(player.health).to.equal(90);
  //   expect(enemy.cooldown).above(0);

  // });



/*************************************************/

module.exports = {
  Enemy,
};
