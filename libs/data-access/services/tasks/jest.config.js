module.exports = {
  name: 'data-access-services-tasks',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/data-access/services/tasks',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
