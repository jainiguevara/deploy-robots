const robots = require('../robots')

describe('Robots', () => {
  let r;

  beforeEach(() => {
    r = robots.deployRobot();
  })

  it('should run a PLACE and REPORT command and return default values with (x, y, f) format', () => {
    r.place(0,0,r.north);
    expect(r.report().result).toBe('0, 0, NORTH')
  })

  // Input:
    // PLACE 0,0,NORTH 
    // MOVE
    // REPORT
  // Output: 
    // 0,1,NORTH 
  it('should run test case 1', () => {
    console.log('TEST CASE 1')
    r.place(0,0,r.north);
    console.log('PLACE 0, 0, NORTH\n', r.report().terrain)
    r.move();
    console.log('MOVE\n', r.report().terrain)
    console.log('REPORT\n', r.report().result)
    expect(r.report().result).toBe('0, 1, NORTH')
  })

  // Input:
    // PLACE 0,0,NORTH 
    // LEFT
    // REPORT
  // Output: 
    // 0,0,WEST
  it('should run test case 2', () => {
    console.log('TEST CASE 2')
    r.place(0,0,r.north);
    console.log('PLACE 0, 0, NORTH\n', r.report().terrain)
    r.left();
    console.log('LEFT\n', r.report().terrain)
    console.log('REPORT\n', r.report().result)
    expect(r.report().result).toBe('0, 0, WEST')
  })

  // Input:
    // PLACE 1,2,EAST 
    // MOVE
    // MOVE
    // LEFT
    // MOVE
    // REPORT
  // Output: 
    // 3,4,NORTH**

  // ** NOTE: THE OUTPUT IN THE CodingChallenge1.doc is incorrect
  it('should run test case 3', () => {
    console.log('TEST CASE 3')
    r.place(1, 2, r.east);
    console.log('PLACE 1, 2, EAST\n', r.report().terrain)
    r.move();
    console.log('MOVE\n', r.report().terrain)
    r.move();
    console.log('MOVE\n', r.report().terrain)
    r.left();
    console.log('LEFT\n', r.report().terrain)
    r.move();
    console.log('MOVE\n', r.report().terrain)
    console.log('REPORT\n', r.report().result)
    expect(r.report().result).toBe('3, 4, NORTH')
  })

  it('should return "Place robot first." if PLACE command is not called', () => {
    expect(r.move()).toBe('Place robot first.')
    expect(r.left()).toBe('Place robot first.')
    expect(r.right()).toBe('Place robot first.')
    expect(r.report().result).toBe('Place robot first.')
  })
})
