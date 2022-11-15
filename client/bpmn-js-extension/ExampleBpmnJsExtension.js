/**
 * A bpmn-js service that provides the actual plug-in feature.
 *
 * Checkout the bpmn-js examples to learn about its capabilities
 * and the extension points it offers:
 *
 * https://github.com/bpmn-io/bpmn-js-examples
 */
import MessageHandler from './messageHandler.js';
import SignalHandler from './signalHandler.js';
import BpmnErrorHandler from './bpmnErrorHandler.js';
import TaskHandler from './taskHandler.js';
import EscalationHandler from './escalationHandler.js';


const handlers = [
 MessageHandler, SignalHandler,BpmnErrorHandler, TaskHandler, EscalationHandler
]

export default function ExampleBpmnJsExtension(elementRegistry, editorActions, canvas, modeling) {

  editorActions.register({
    "generateConstants:java": function() {
      parse();
    },
    "generateConstants:python": function() {
      parse();
    }
  });

  const parse = () => {
    const result = {
      messages: [],
      signals:[],
      bpmnErrorCodes:[],
      bpmnEscalationCodes:[],
      externalTaskTopics:[],
      delegateExpressions:[],
      javaClasses:[],
      jobTypes:[]
      
    };
    var elements = elementRegistry._elements;
  Object.keys(elements).forEach(function(key) {
      var businessObject = elements[key].element.businessObject;
      const context = {
        element: businessObject,
        result: result
      };
      handlers.forEach(h => h(context));
  });
  console.log(result);
  };
}

ExampleBpmnJsExtension.$inject = [ 'elementRegistry', 'editorActions', 'canvas', 'modeling' ];