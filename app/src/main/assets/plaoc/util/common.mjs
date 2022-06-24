const getExtension = (fileName) => {
  console.log(fileName, fileName.lastIndexOf("."));
  return fileName.substring(fileName.lastIndexOf(".") + 1);
};
export { getExtension };
//# sourceMappingURL=common.mjs.map
