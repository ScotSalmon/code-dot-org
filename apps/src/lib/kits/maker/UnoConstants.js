export const EXTERNAL_PINS = [0, 1, 2, 3, 6, 9, 10, 12];
export const J5_CONSTANTS = {
  INPUT: 0,
  OUTPUT: 1,
  ANALOG: 2,
  PWM: 3,
  SERVO: 4
};

export const BUTTON_VARS = ['button'];

const BUTTON_EVENTS = ['down', 'up'];

export const COMPONENT_EVENTS = {
  button: BUTTON_EVENTS
};

// Circuit playground command codes for certain needed overrides
// See playground-io/lib/index.js
// Hopefully it does the right thing for my not-Playground Firmata derivative
export const CP_COMMAND = 0x40;
