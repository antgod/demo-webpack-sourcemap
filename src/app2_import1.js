export default function printMe() {
  console.log('app2_import1');
}

const a = function printMe() {
  console.log('app2_import_exporta');
}

const b = function() {
  console.log('app2_import_exportb');
}

export {
  a,
  b,
}
