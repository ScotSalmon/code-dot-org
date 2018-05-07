import { SVG_NS } from '../constants';
import { appendCategory, createJsWrapperBlockCreator } from '../block_utils';
import { getStore } from '../redux';
import { getLocation } from './locationPickerModule';

const SPRITE_COLOR = [184, 1.00, 0.74];
const EVENT_COLOR = [140, 1.00, 0.74];
const EVENT_LOOP_COLOR = [322, 0.90, 0.95];
const VARIABLES_COLOR = [312, 0.32, 0.62];
const WORLD_COLOR = [240, 0.45, 0.65];
const WHEN_RUN_COLOR = [39, 1.00, 0.99];
const LOCATION_COLOR = [300, 0.46, 0.89];

const customInputTypes = {
  locationPicker: {
    addInput(block, input) {
      const label = block.appendDummyInput()
          .appendTitle(`${input.label}(0, 0)`, `${input.name}_LABEL`)
          .titleRow[0];
      const icon = document.createElementNS(SVG_NS, 'tspan');
      icon.style.fontFamily = 'FontAwesome';
      icon.textContent = '\uf276';
      const button = new Blockly.FieldButton(icon, updateValue => {
          getLocation(loc => {
            if (loc) {
              button.setValue(JSON.stringify(loc));
            }
          });
        },
        block.getHexColour(),
        value => {
          if (value) {
            try {
              const loc = JSON.parse(value);
              label.setText(`${input.label}(${loc.x}, ${loc.y})`);
            } catch (e) {
              // Just ignore bad values
            }
          }
        }
      );
      block.appendDummyInput()
          .appendTitle(button, input.name);
    },
    generateCode(block, arg) {
      return block.getTitleValue(arg.name);
    },
  },
};

export default {
  install(blockly, blockInstallOptions) {
    const SPRITE_TYPE = blockly.BlockValueType.SPRITE;
    const { ORDER_MEMBER, ORDER_ATOMIC } = Blockly.JavaScript;

    const sprites = () => {
      const animationList = getStore().getState().animationList;
      if (!animationList || animationList.orderedKeys.length === 0) {
        console.warn("No sprites available");
        return [['sprites missing', 'null']];
      }
      return animationList.orderedKeys.map(key => {
        const name = animationList.propsByKey[key].name;
        return [name, `"${name}"`];
      });
    };

    const createJsWrapperBlock = createJsWrapperBlockCreator(
      blockly,
      'gamelab',
      [SPRITE_TYPE],
      SPRITE_TYPE,
      customInputTypes,
    );

    createJsWrapperBlock({
      color: WHEN_RUN_COLOR,
      func: 'initialize',
      name: 'setup',
      blockText: 'setup',
      eventBlock: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'makeNewSprite',
      blockText: 'make a new {ANIMATION} sprite at {X} {Y}',
      args: [
        { name: 'ANIMATION', options: sprites },
        { name: 'X', type: blockly.BlockValueType.NUMBER },
        { name: 'Y', type: blockly.BlockValueType.NUMBER },
      ],
      returnType: SPRITE_TYPE,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'makeNewSpriteLocation',
      blockText: 'make a new {ANIMATION} sprite at {LOCATION}',
      args: [
        { name: 'ANIMATION', options: sprites },
        { name: 'LOCATION', type: blockly.BlockValueType.LOCATION },
      ],
      returnType: SPRITE_TYPE,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'setAnimation',
      blockText: 'change {THIS} costume to {ANIMATION}',
      args: [
        { name: 'ANIMATION', options: sprites },
      ],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'setTint',
      blockText: 'change color of {THIS} to {COLOR}',
      args: [
        { name: 'COLOR', type: blockly.BlockValueType.COLOUR },
      ],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'removeTint',
      blockText: 'remove color from {THIS}',
      args: [],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'makeNewGroup',
      blockText: 'make a new group',
      args: [],
      returnType: SPRITE_TYPE,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'add',
      blockText: 'add {SPRITE} to group {THIS}',
      args: [
        { name: 'SPRITE', type: SPRITE_TYPE },
      ],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'moveUp',
      blockText: '{THIS} move up',
      args: [],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'moveDown',
      blockText: '{THIS} move down',
      args: [],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'moveLeft',
      blockText: '{THIS} move left',
      args: [],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'moveRight',
      blockText: '{THIS} move right',
      args: [],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: EVENT_COLOR,
      func: 'whenUpArrow',
      blockText: 'when up arrow pressed',
      args: [],
      eventBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_COLOR,
      func: 'whenDownArrow',
      blockText: 'when down arrow pressed',
      args: [],
      eventBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_COLOR,
      func: 'whenLeftArrow',
      blockText: 'when left arrow pressed',
      args: [],
      eventBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_COLOR,
      func: 'whenRightArrow',
      blockText: 'when right arrow pressed',
      args: [],
      eventBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_LOOP_COLOR,
      func: 'whileUpArrow',
      blockText: 'while up arrow pressed',
      args: [],
      eventLoopBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_LOOP_COLOR,
      func: 'whileDownArrow',
      blockText: 'while down arrow pressed',
      args: [],
      eventLoopBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_LOOP_COLOR,
      func: 'whileLeftArrow',
      blockText: 'while left arrow pressed',
      args: [],
      eventLoopBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_LOOP_COLOR,
      func: 'whileRightArrow',
      blockText: 'while right arrow pressed',
      args: [],
      eventLoopBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_COLOR,
      func: 'whenTouching',
      blockText: 'when {SPRITE1} touches {SPRITE2}',
      args: [
        { name: 'SPRITE1', type: SPRITE_TYPE },
        { name: 'SPRITE2', type: SPRITE_TYPE },
      ],
      eventBlock: true,
    });

    createJsWrapperBlock({
      color: EVENT_LOOP_COLOR,
      func: 'whileTouching',
      blockText: 'while {SPRITE1} is touching {SPRITE2}',
      args: [
        { name: 'SPRITE1', type: SPRITE_TYPE },
        { name: 'SPRITE2', type: SPRITE_TYPE },
      ],
      eventLoopBlock: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'displace',
      blockText: '{THIS} blocks {SPRITE} from moving',
      args: [
        {name: 'SPRITE', type: SPRITE_TYPE },
      ],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'destroy',
      blockText: 'remove {THIS}',
      args: [],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: VARIABLES_COLOR,
      expression: 'arguments[0]',
      orderPrecedence: ORDER_MEMBER,
      name: 'firstTouched',
      blockText: 'first touched sprite',
      returnType: SPRITE_TYPE,
    });

    createJsWrapperBlock({
      color: VARIABLES_COLOR,
      expression: 'arguments[1]',
      orderPrecedence: ORDER_MEMBER,
      name: 'secondTouched',
      blockText: 'second touched sprite',
      returnType: SPRITE_TYPE,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      expression: 'length',
      orderPrecedence: ORDER_MEMBER,
      name: 'groupLength',
      blockText: 'number of sprites in {THIS}',
      methodCall: true,
      returnType: blockly.BlockValueType.NUMBER,
    });

    createJsWrapperBlock({
      color: WORLD_COLOR,
      func: 'setBackground',
      blockText: 'set background color {COLOR}',
      args: [
        { name: 'COLOR', type: blockly.BlockValueType.COLOUR },
      ],
    });

    createJsWrapperBlock({
      color: EVENT_COLOR,
      func: 'clickedOn',
      blockText: 'when {SPRITE} clicked on',
      args: [
        { name: 'SPRITE', type: SPRITE_TYPE },
      ],
      eventBlock: true,
    });

    createJsWrapperBlock({
      color: SPRITE_COLOR,
      func: 'setPosition',
      blockText: 'move {THIS} to the {POSITION} position',
      args: [
        {
          name: 'POSITION',
          options: [
            ['top left', '{x: 50, y: 50}'],
            ['top center', '{x: 200, y: 50}'],
            ['top right', '{x: 350, y: 50}'],
            ['center left', '{x: 50, y: 200}'],
            ['center', '{x: 200, y: 200}'],
            ['center right', '{x: 350, y: 200}'],
            ['bottom left', '{x: 50, y: 350}'],
            ['bottom center', '{x: 200, y: 350}'],
            ['bottom right', '{x: 350, y: 350}'],
            ['random', '"random"'],
          ],
        },
      ],
      methodCall: true,
    });

    createJsWrapperBlock({
      color: WORLD_COLOR,
      func: 'showTitleScreen',
      blockText: 'show title screen',
      args: [
        { name: 'TITLE', label: 'title', type: blockly.BlockValueType.STRING },
        { name: 'SUBTITLE', label: 'text', type: blockly.BlockValueType.STRING }
      ],
      inline: false,
    });

    createJsWrapperBlock({
      color: WORLD_COLOR,
      func: 'hideTitleScreen',
      blockText: 'hide title screen',
      args: [],
    });

    createJsWrapperBlock({
      color: LOCATION_COLOR,
      simpleValue: true,
      name: 'location_picker',
      blockText: '{LOCATION}',
      args: [{
        name: 'LOCATION',
        customInput: 'locationPicker',
      }],
      returnType: Blockly.BlockValueType.LOCATION,
      orderPrecedence: ORDER_ATOMIC,
    });

    // Legacy style block definitions :(
    const generator = blockly.Generator.get('JavaScript');

    const behaviorEditor = new Blockly.FunctionEditor(
      {
        FUNCTION_HEADER: 'Behavior',
        FUNCTION_NAME_LABEL: 'Name your behavior:',
        FUNCTION_DESCRIPTION_LABEL: 'What is your behavior supposed to do?',
      },
      'behavior_definition',
      {
        [Blockly.BlockValueType.Sprite]: 'sprite_parameter_get',
      },
    );

    Blockly.Blocks.sprite_variables_get = {
      // Variable getter.
      init: function () {
        var fieldLabel = new Blockly.FieldLabel(Blockly.Msg.VARIABLES_GET_ITEM);
        // Must be marked EDITABLE so that cloned blocks share the same var name
        fieldLabel.EDITABLE = true;
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setHSV(131, 0.64, 0.62);
        this.appendDummyInput()
            .appendTitle(Blockly.Msg.VARIABLES_GET_TITLE)
            .appendTitle(Blockly.disableVariableEditing ? fieldLabel
                : new Blockly.FieldVariable(
                    Blockly.Msg.VARIABLES_SET_ITEM,
                    null,
                    null,
                    Blockly.BlockValueType.SPRITE,
                  ),
                'VAR')
            .appendTitle(Blockly.Msg.VARIABLES_GET_TAIL);
        this.setStrictOutput(true, Blockly.BlockValueType.SPRITE);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
      },
      getVars: function (category) {
        if (category && category !== Blockly.BlockValueType.SPRITE) {
          return [];
        }
        return [this.getTitleValue('VAR')];
      },
      renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      },
      removeVar: Blockly.Blocks.variables_get.removeVar,
    };
    generator.sprite_variables_get = generator.variables_get;
    Blockly.Variables.registerGetter(Blockly.BlockValueType.SPRITE,
      'sprite_variables_get');

    Blockly.Blocks.sprite_parameter_get = {
      init() {
        var fieldLabel = new Blockly.FieldLabel(Blockly.Msg.VARIABLES_GET_ITEM);
        // Must be marked EDITABLE so that cloned blocks share the same var name
        fieldLabel.EDITABLE = true;
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setHSV(7, 0.80, 0.95);
        this.appendDummyInput()
            .appendTitle(Blockly.Msg.VARIABLES_GET_TITLE)
            .appendTitle(Blockly.disableVariableEditing ? fieldLabel
                : new Blockly.FieldParameter(
                  Blockly.Msg.VARIABLES_GET_ITEM,
                  null,
                  null,
                  true /* undeletable */,
                ),
              'VAR')
            .appendTitle(Blockly.Msg.VARIABLES_GET_TAIL);
        this.setStrictOutput(true, Blockly.BlockValueType.SPRITE);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
      },
      renameVar(oldName, newName) {
        if (behaviorEditor.isOpen()) {
          behaviorEditor.renameParameter(oldName, newName);
          behaviorEditor.refreshParamsEverywhere();
        }
      },
      removeVar: Blockly.Blocks.variables_get.removeVar,
    };
    generator.sprite_parameter_get = generator.variables_get;

    Blockly.Blocks.sprite_variables_set = {
      // Variable setter.
      init: function () {
        var fieldLabel = new Blockly.FieldLabel(Blockly.Msg.VARIABLES_SET_ITEM);
        // Must be marked EDITABLE so that cloned blocks share the same var name
        fieldLabel.EDITABLE = true;
        this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
        this.setHSV(131, 0.64, 0.62);
        this.appendValueInput('VALUE')
            .setStrictCheck(Blockly.BlockValueType.SPRITE)
            .appendTitle(Blockly.Msg.VARIABLES_SET_TITLE)
            .appendTitle(Blockly.disableVariableEditing ? fieldLabel
              : new Blockly.FieldVariable(
                  Blockly.Msg.VARIABLES_SET_ITEM,
                  null,
                  null,
                  Blockly.BlockValueType.SPRITE,
                ),
              'VAR')
            .appendTitle(Blockly.Msg.VARIABLES_SET_TAIL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
      },
      getVars: function (category) {
        if (category && category !== Blockly.BlockValueType.SPRITE) {
          return [];
        }
        return [this.getTitleValue('VAR')];
      },
      renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      },
    };
    generator.sprite_variables_set = generator.variables_set;
    Blockly.Variables.registerSetter(Blockly.BlockValueType.SPRITE,
      'sprite_variables_set');

    Blockly.Blocks.gamelab_behavior_get = {
      init() {
        var fieldLabel = new Blockly.FieldLabel(Blockly.Msg.VARIABLES_GET_ITEM);
        // Must be marked EDITABLE so that cloned blocks share the same var name
        fieldLabel.EDITABLE = true;
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setHSV(131, 0.64, 0.62);
        const mainTitle = this.appendDummyInput()
            .appendTitle(Blockly.disableVariableEditing ? fieldLabel
                : new Blockly.FieldVariable(
                    Blockly.Msg.VARIABLES_GET_ITEM,
                    null,
                    null,
                    Blockly.BlockValueType.BEHAVIOR,
                ), 'VAR')
            .appendTitle(Blockly.Msg.VARIABLES_GET_TAIL);

        if (Blockly.useModalFunctionEditor) {
          var editLabel = new Blockly.FieldIcon(Blockly.Msg.FUNCTION_EDIT);
          Blockly.bindEvent_(editLabel.fieldGroup_, 'mousedown', this, this.openEditor);
          mainTitle.appendTitle(' ')
              .appendTitle(editLabel);
        }

        this.setStrictOutput(true, Blockly.BlockValueType.BEHAVIOR);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
      },

      openEditor(e) {
        e.stopPropagation();
        behaviorEditor.openEditorForFunction(this, this.getTitleValue('VAR'));
      },

      getVars(category) {
        if (category && category !== Blockly.BlockValueType.BEHAVIOR) {
          return [];
        }
        return [this.getTitleValue('VAR')];
      },

      renameVar(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      },
    };

    generator.gamelab_behavior_get = function () {
      return [
        Blockly.JavaScript.variableDB_.getName(
            this.getTitleValue('VAR'),
            Blockly.Procedures.NAME_TYPE),
        Blockly.JavaScript.ORDER_ATOMIC
      ];
    };

    Blockly.Blocks.behavior_definition = {
      shouldHideIfInMainBlockSpace: function () {
        return Blockly.useModalFunctionEditor;
      },
      init: function () {
        var showParamEditIcon = !Blockly.disableParamEditing && !Blockly.useModalFunctionEditor;

        this.setHSV(94, 0.84, 0.60);
        var name = Blockly.Procedures.findLegalName(
            Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
        this.appendDummyInput()
            .appendTitle(showParamEditIcon ? '' : ' ')
            .appendTitle(
                new Blockly.FieldTextInput(name, Blockly.Procedures.rename),
                'NAME')
            .appendTitle('', 'PARAMS');
        this.appendStatementInput('STACK')
            .appendTitle(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
        if (showParamEditIcon) {
          this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        }
        // Only want to have the backdrop in the mainBlockSpace. We don't want it in
        // the toolbox or in the feedback dialog (which is readonly).
        this.setFramed( this.blockSpace === Blockly.mainBlockSpace &&
            !this.blockSpace.isReadOnly());
        this.parameterNames_ = ['self'];
        this.parameterTypes_ = [Blockly.BlockValueType.SPRITE];
      },
      updateParams_: function () {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        for (var x = 0; x < this.parameterNames_.length; x++) {
          if (hash['arg_' + this.parameterNames_[x].toLowerCase()]) {
            badArg = true;
            break;
          }
          hash['arg_' + this.parameterNames_[x].toLowerCase()] = true;
        }
        if (badArg) {
          this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
          this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (this.parameterNames_.length) {
          paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
              ' ' + this.parameterNames_.join(', ');
        }
        this.setTitleValue(paramString, 'PARAMS');
      },
      mutationToDom: function () {
        var container = document.createElement('mutation');
        // Add argument mutations
        for (var x = 0; x < this.parameterNames_.length; x++) {
          var parameter = document.createElement('arg');
          parameter.setAttribute('name', this.parameterNames_[x]);
          container.appendChild(parameter);
        }
        // Add description mutation
        if (this.description_) {
          var desc = document.createElement('description');
          desc.textContent = this.description_;
          container.appendChild(desc);
        }
        return container;
      },
      domToMutation: function (xmlElement) {
        this.parameterNames_ = [];
        this.parameterTypes_ = [];
        for (let childNode of xmlElement.childNodes) {
          var nodeName = childNode.nodeName.toLowerCase();
          if (nodeName === 'arg') {
            this.parameterNames_.push(childNode.getAttribute('name'));
            this.parameterTypes_.push(Blockly.BlockValueType.NONE);
          } else if (nodeName === 'description') {
            this.description_ = childNode.textContent;
          }
        }
        this.updateParams_();
      },
      decompose: function (blockSpace) {
        var containerBlock = new Blockly.Block(blockSpace,
                                               'procedures_mutatorcontainer');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.parameterNames_.length; x++) {
          var paramBlock = new Blockly.Block(blockSpace, 'procedures_mutatorarg');
          paramBlock.initSvg();
          paramBlock.setTitleValue(this.parameterNames_[x], 'NAME');
          // Store the old location.
          paramBlock.oldLocation = x;
          connection.connect(paramBlock.previousConnection);
          connection = paramBlock.nextConnection;
        }
        // Initialize procedure's callers with blank IDs.
        Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
            this.blockSpace, this.parameterNames_, null);
        return containerBlock;
      },
      /**
       * Modifies this block's parameters to match a given mutator block
       * @param {Blockly.Block} containerBlock mutator container block
       */
      compose: function (containerBlock) {
        var currentParamBlock = containerBlock.getInputTargetBlock('STACK');
        var paramNames = [];
        var paramIDs = [];
        while (currentParamBlock) {
          paramNames.push(currentParamBlock.getTitleValue('NAME'));
          paramIDs.push(currentParamBlock.id);
          currentParamBlock = currentParamBlock.nextConnection &&
            currentParamBlock.nextConnection.targetBlock();
        }
        this.updateParamsFromArrays(paramNames, paramIDs);
      },
      /**
       * Updates parameters (renaming, deleting, adding as appropriate)
       * on this procedure and its callers.
       * @param {Array.<String>} paramNames ordered names of parameters for this procedure
       * @param {Array.<String>} paramIDs unique IDs for each parameter, used to update existing
       *     references to parameters across renames
       */
      updateParamsFromArrays: function (paramNames, paramIDs) {
        this.parameterNames_ = [...paramNames];
        this.paramIds_ = paramIDs ? [...paramIDs] : null;
        this.updateParams_();
        this.updateCallerParams_();
      },
      updateCallerParams_: function () {
        Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
            this.blockSpace, this.parameterNames_, this.paramIds_);
      },
      /**
       * Disposes of this block and (optionally) its callers
       * @param {boolean} healStack see superclass
       * @param {boolean} animate see superclass
       * @param {?boolean} opt_keepCallers if false, callers of this method
       *    are disposed
       * @override
       */
      dispose: function (healStack, animate, opt_keepCallers) {
        if (!opt_keepCallers) {
          // Dispose of any callers.
          var name = this.getTitleValue('NAME');
          Blockly.Procedures.disposeCallers(name, this.blockSpace);
        }
        // Call parent's destructor.
        Blockly.Block.prototype.dispose.apply(this, arguments);
      },
      getProcedureInfo: function () {
        return {
          name: this.getTitleValue('NAME'),
          parameterNames: this.parameterNames_,
          parameterIDs: this.paramIds_,
          parameterTypes: this.paramTypes_,
          type: this.type,
          callType: this.callType_
        };
      },
      getVars: function (category) {
        if (category && category !== Blockly.BlockValueType.BEHAVIOR) {
          return [];
        }
        return [this.getTitleValue('NAME')];
      },
      renameVar: function (oldName, newName) {
        let change = false;
        for (let x = 0; x < this.parameterNames_.length; x++) {
          if (Blockly.Names.equals(oldName, this.parameterNames_[x])) {
            this.parameterNames_[x] = newName;
            change = true;
          }
        }
        if (change) {
          this.updateParams_();
          // Update the mutator's variables if the mutator is open.
          if (this.mutator && this.mutator.isVisible()) {
            let blocks = this.mutator.blockSpace_.getAllBlocks();
            for (let block of blocks) {
              if (block.type === 'procedures_mutatorarg' &&
                  Blockly.Names.equals(oldName, block.getTitleValue('NAME'))) {
                block.setTitleValue(newName, 'NAME');
              }
            }
          }
        }
      },
      removeVar: function (oldName) {
        var index = this.parameterNames_.indexOf(oldName);
        if (index > -1) {
          this.parameterNames_.splice(index, 1);
          this.updateParams_();
        }
      },
      //customContextMenu: function (options) {
      //  // Add option to create caller.
      //  var option = {enabled: true};
      //  var name = this.getTitleValue('NAME');
      //  option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);

      //  var xmlMutation = goog.dom.createDom('mutation');
      //  xmlMutation.setAttribute('name', name);
      //  for (var x = 0; x < this.parameterNames_.length; x++) {
      //    var xmlArg = goog.dom.createDom('arg');
      //    xmlArg.setAttribute('name', this.parameterNames_[x]);
      //    xmlMutation.appendChild(xmlArg);
      //  }
      //  var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
      //  xmlBlock.setAttribute('type', this.callType_);
      //  option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);

      //  options.push(option);
      //  // Add options to create getters for each parameter.
      //  for (var x = 0; x < this.parameterNames_.length; x++) {
      //    var option = {enabled: true};
      //    var name = this.parameterNames_[x];
      //    option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
      //    var xmlTitle = goog.dom.createDom('title', null, name);
      //    xmlTitle.setAttribute('name', 'VAR');
      //    var xmlBlock = goog.dom.createDom('block', null, xmlTitle);
      //    xmlBlock.setAttribute('type', 'variables_get');
      //    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      //    options.push(option);
      //  }
      //},
      userCreated: false,
      shouldBeGrayedOut: function () {
        return false;
      },
      callType_: 'procedures_callnoreturn'
    };

    generator.behavior_definition = generator.procedures_defnoreturn;

    Blockly.Procedures.DEFINITION_BLOCK_TYPES.push('behavior_definition');
    Blockly.Variables.getters[Blockly.BlockValueType.BEHAVIOR] = 'gamelab_behavior_get';
    Blockly.Flyout.configure(Blockly.BlockValueType.BEHAVIOR, {
      initialize(flyout, cursor) {
        if (Blockly.functionEditor && !Blockly.functionEditor.isOpen()) {
          flyout.addButtonToFlyout_(cursor, 'Create a Behavior',
            behaviorEditor.openWithNewFunction.bind(behaviorEditor));
        }
      },
      addDefaultVar: false,
    });
  },

  installCustomBlocks(blockly, blockInstallOptions, customBlocks, level, hideCustomBlocks) {
    const SPRITE_TYPE = blockly.BlockValueType.SPRITE;
    const blockNames = customBlocks.map(createJsWrapperBlockCreator(
      blockly,
      'gamelab',
      [SPRITE_TYPE],
      SPRITE_TYPE,
      customInputTypes,
    ));

    if (!hideCustomBlocks) {
      level.toolbox = appendCategory(level.toolbox, blockNames, 'Custom');
    }
  },
};
