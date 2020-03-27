// export const API_ROOT = 'http://yikyakclonebackend.herokuapp.com';
// export const API_WS_ROOT = 'wss://yikyakclonebackend.herokuapp.com/cable';
export const API_ROOT = 'http://localhost:3000';
export const API_WS_ROOT = 'ws://localhost:3334/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
export const ANIMALS = `bat bear bee bird bug butterfly camel cat cheetah chicken 
coala cow crocodile dinosaur dog dolphin dove duck eagle elephant fish flamingo 
fox frog giraffe gorilla horse kangoroo leopard lion monkey mouse panda parrot 
penguin shark sheep snake spider squirrel star-fish tiger turtle wolf zebra`.split(' ')

// const cable = ActionCable.createConsumer("ws://lynx-esdras-anis-v1.herokuapp.com/cable?token=${token}");
// const cable = ActionCable.createConsumer("wss://lynx-rpc.herokuapp.com/cable?token=${token}");