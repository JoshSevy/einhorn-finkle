const users = [{
  id: '1',
  name: 'Josh',
  email: 'joshuasevy@outlook.com',
  age: 38
}, {
  id: '2',
  name: 'Nicole',
  email: 'niki@gmail.com',
  age: 32
}, {
  id: '3',
  name: 'Hank',
  email: 'baby@gmail.com',
}];

const posts = [{
  id: '11',
  title: 'Post one of many',
  body: 'Here is my first post cant wait to post more',
  published: true,
  author: '1'
}, {
  id: '12',
  title: 'My second post',
  body: 'I can\'t believe this is already my second post',
  published: true,
  author: '1'
}, {
  id: '13',
  title: 'What should I write',
  body: 'Come on got fans to impress',
  published: false,
  author: '2'
}];

const comments = [{
  id: '22',
  text: 'Really love your post',
  author: '1',
  post: '11'
}, {
  id: '23',
  text: 'Would love to discuss this more, interesting',
  author: '2',
  post: '12'
}, {
  id: '24',
  text: 'I have to disagree I prefer non relational structures',
  author: '3',
  post: '13'
}];

const db = {
  users,
  posts,
  comments
};

export { db as default };