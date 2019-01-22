const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Mik',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Buddy',
        room: 'Node Course'
      }
    ];
  });

  it('should remove a user', () => {
    const removeUser = users.removeUser('3');

    expect(removeUser).toEqual(['Mike', 'Mik']);
  });

  it('should not remove a user', () => {
    const removeUser = users.removeUser('4');

    expect(removeUser).toEqual(['Mike', 'Mik', 'Buddy']);
  });

  it('should find a user', () => {
    const getUser = users.getUser('1');

    expect(getUser).toEqual([
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      }
    ]);
  });

  it('should not find a user', () => {
    const getUser = users.getUser('4');
    expect(getUser).toEqual([]);
  });

  it('should add a new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Fouad',
      room: 'home office'
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names from a node course', () => {
    const userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Buddy']);
  });

  it('should return names from a react course', () => {
    const userList = users.getUserList('React Course');

    expect(userList).toEqual(['Mik']);
  });
});
