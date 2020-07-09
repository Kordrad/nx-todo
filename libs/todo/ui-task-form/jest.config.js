module.exports = {
  name: 'todo-ui-task-form',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todo/ui-task-form',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
