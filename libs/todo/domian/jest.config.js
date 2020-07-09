module.exports = {
  name: 'todo-domian',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todo/domian',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
