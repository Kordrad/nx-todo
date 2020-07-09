module.exports = {
  name: 'todo-ui-task-list',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todo/ui-task-list',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
