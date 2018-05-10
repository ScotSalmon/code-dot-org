import five from '@code-dot-org/johnny-five';
import Led from './Led';

/**
 * Initializes a set of Johnny-Five component instances for the currently
 * connected Arduino Uno board.
 *
 * @param {five.Board} board - the johnny-five board object that needs new
 *        components initialized.
 * @returns {Promise.<Object.<String, Object>>} board components
 */
export function createArduinoUnoComponents(board) {
  return Promise.all([
  ]).then(() => {
    return {
      led: new Led({board, pin: 13})
    };
  });
}

/**
 * De-initializes any Johnny-Five components that might have been created
 * by createArduinoUnoComponents
 * @param {Object} components - map of components, as originally returned by
 *   createArduinoUnoComponents.  This object will be mutated: Destroyed
 *   components will be removed. Additional members of this object will be
 *   ignored.
 */
export function destroyArduinoUnoComponents(components) {
  if (components.led) {
    components.led.stop();
  }
  delete components.led;

  // No reset needed for Button
  delete components.button;
}

/**
 * Set of classes used by interpreter to understand the type of instantiated
 * objects, allowing it to make methods and properties of instances available.
 */
export const componentConstructors = {
  Led,
  Board: five.Board,
  Pin: five.Pin,
  /**
   * @link https://en.wikipedia.org/wiki/Three_Laws_of_Robotics
   * 1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.
   * 2. A robot must obey orders given it by human beings except where such orders would conflict with the First Law.
   * 3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.
   */
  Servo: five.Servo
};
