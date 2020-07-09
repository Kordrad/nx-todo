module.exports = {
  name: 'todo-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todo/shell',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
