module.exports = {
  name: 'todo-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todo/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
