export default function (context) {
  // find relevant data from process element
  const type = context.element.$type.substring(context.element.$type.indexOf(':')+1);
  const name = context.element.name;
  const id = context.element.id;
  // check if type already exists
  let names = context.result.elementIds[type];
  if (!names) {
    // if not, create it on results
    context.result.elementIds[type] = {};
    names = context.result.elementIds[type];
  }
  // create name to insert
  let counter = 0;
  let nameToInsert = name || id;
  while (names[nameToInsert] && names[nameToInsert] !== id) {
    nameToInsert = `${name}_${counter}`;
    counter++;
  }
  // insert id to result
  names[nameToInsert] = id;
}
