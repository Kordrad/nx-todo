module.exports = {
  name: 'data-access-store',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/data-access/store',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
