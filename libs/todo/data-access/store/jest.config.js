module.exports = {
  name: 'todo-data-access-store',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/todo/data-access/store',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};