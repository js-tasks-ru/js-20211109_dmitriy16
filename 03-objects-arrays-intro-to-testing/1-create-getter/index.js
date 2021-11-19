/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathSeparate = path.split(".");
  const Getter = function (pathSeparate) {
    this.path = pathSeparate;
    const finder = (obj, pathSeparate)=>{
      const path = pathSeparate.shift();
      if (pathSeparate.length) {
        return finder(obj[path], pathSeparate);
      } else {
        return !!obj && !!obj[path] ? obj[path] : undefined;
      }
    };
    return (obj)=>{
      return finder(obj, this.path);
    };
  };

  return new Getter(pathSeparate);
}
