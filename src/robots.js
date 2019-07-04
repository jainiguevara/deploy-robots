const deployRobot = () => {
  const north = 'north';
  const south = 'south';
  const east = 'east';
  const west = 'west';
  const dimension = 5;
  let robot;
  let current;
  let terrain = [];

  const createTerrain = (dimension) => {
    let newTerrain = [];
    for (let row = 0; row < dimension; row++) {
      newTerrain[row] = [];
      for (let col = 0; col < dimension; col++) {
        newTerrain[row][col] = 0
      }
    }
    return newTerrain
  }

  const updateRobotLocation = (prev, next, f = undefined) => {
    if (!f && next !== null) {
      terrain[(terrain[prev.y].length - 1) - prev.y][prev.x] = 0;
      terrain[(terrain[next.y].length - 1) - next.y][next.x] = 1;
      return next;
    } else {
      const current = { ...prev, f };
      terrain[(terrain[current.y].length - 1) - current.y][current.x] = 1;
      return current;
    }
  }

  return {
    north,
    south,
    east,
    west,
    terrain,
    robot,
    place (x, y, f) {
      robot = { x, y, f }
      current = { ...robot }
      terrain = createTerrain(dimension);
      if ((y < 0 || y >= dimension) || (x < 0 || x >= dimension)) {
        return 'Robot X or Y location out of bounds'
      }
      terrain[(terrain[y].length - 1) - y][x] = 1
    },
    move () {
      if (!robot) {
        return 'Place robot first.';
      }
      let prev = { ...current }
      let next
      if ((prev.y < 0 || prev.y >= dimension) || (prev.x < 0 || prev.x >= dimension)) {
        current = prev;
        return 'WARNING: Robot X or Y location out of bounds'
      }
      switch (current.f) {
        case north:
            if (prev.y < 0 || prev.y >= dimension - 1) {
              current = updateRobotLocation(prev, null, north)
            } else {
              next = { ...prev, y: current.y + 1, f: north }
              current = updateRobotLocation(prev, next);
            }
          break;
        case south:
          if (prev.y === 0) {
            current = updateRobotLocation(prev, null, south)
          } else {
            next = { ...prev, y: prev.y - 1, f: south }
            current = updateRobotLocation(prev, next);
          }
          break;
        case east:
          if (prev.x < 0 || prev.x >= dimension - 1) {
            current = updateRobotLocation(prev, null, east)
          } else {
            next = { ...prev, x: prev.x + 1, f: east }
            current = updateRobotLocation(prev, next)
          }
          break;
        case west:
            if (prev.x === 0) {
            current = updateRobotLocation(prev, null, west)
          } else {
            next = { ...prev, x: prev.x - 1, f: west }
            current = updateRobotLocation(prev, next)
          }
          break;
        default:
          break;
      }
      return `Robot moved ${current.f}`
    },
    left () {
      if (!current) {
        return 'Place robot first.';
      }
      let prev = { ...current }
      let next
      switch (prev.f) {
        case north:
          next = { ...prev, x: prev.x !== 0 ? prev.x - 1 : prev.x, f: west }
          break;
        case south:
          next = { ...prev, x: prev.x !== (dimension - 1) ? prev.x + 1 : prev.x, f: east }
          break;
        case east:
          next = { ...prev, y: prev.y !== (dimension - 1) ? prev.y + 1 : prev.y, f: north }
          break;
        case west:
          next = { ...prev, y: prev.y !== 0 ? prev.y - 1 : 0, f: south }
          break;
        default:
          break;
      }
      current = updateRobotLocation(prev, next)
      return 'Robot turned left'
    },
    right () {
      if (!current) {
        return 'Place robot first.';
      }
      let prev = { ...current }
      let next
      switch (prev.f) {
        case north:
          next = { ...prev, x: prev.x !== (dimension - 1)? prev.x + 1 : prev.x, f: east }
          break;
        case south:
          next = { ...prev, x: prev.x !== 0 ? prev.x - 1 : prev.x, f: west }
          break;
        case east:
          next = { ...prev, y: prev.y !== 0 ? prev.y - 1 : prev.y, f: south }
          break;
        case west:
          next = { ...prev, y: prev.y !== (dimension - 1) ? prev.y + 1 : 0, f: north }
          break;
        default:
          break;
      }
      current = updateRobotLocation(prev, next)
      return 'Robot turned right'
    },
    report () {
      if (!current) {
        return { result: 'Place robot first.' };
      }
      return { result: `${current.x}, ${current.y}, ${current.f.toUpperCase()}`, terrain }
    }
  }
};

module.exports = {
  deployRobot
}