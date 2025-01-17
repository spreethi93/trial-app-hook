module.exports = [{
  inlineStyles: {
    onlyMatchedOnce: false // comment
  }
}, {
  cleanupAttrs: true
}, {
  removeDoctype: true
}, {
  removeXMLProcInst: true
}, {
  removeComments: true
}, {
  removeMetadata: true
}, {
  removeTitle: true
}, {
  removeDesc: true
}, {
  removeUselessDefs: true
}, {
  removeEditorsNSData: true
}, {
  removeEmptyAttrs: true
}, {
  removeHiddenElems: true
}, {
  removeEmptyText: true
}, {
  removeEmptyContainers: true
}, {
  removeViewBox: false
}, {
  cleanupEnableBackground: true
}, {
  convertStyleToAttrs: true
}, {
  convertColors: true
}, {
  convertPathData: true
}, {
  convertTransform: true
}, {
  removeUnknownsAndDefaults: true
}, {
  removeNonInheritableGroupAttrs: true
}, {
  removeUselessStrokeAndFill: true
}, {
  removeUnusedNS: true
}, {
  cleanupIDs: {
    prefix: {
      toString() {
        return `fd-${Math.random().toString(36).substr(2, 9)}`;
      }
    }
  }
}, {
  cleanupNumericValues: true
}, {
  moveElemsAttrsToGroup: true
}, {
  moveGroupAttrsToElems: true
}, {
  collapseGroups: true
}, {
  removeRasterImages: false
}, {
  mergePaths: true
}, {
  convertShapeToPath: true
}, {
  sortAttrs: true
}, {
  removeDimensions: false
}];
