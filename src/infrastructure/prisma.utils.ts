export class PrismaUtils {
  private static DEFAULT_PAGE = 0;
  private static DEFAULT_PAGE_SIZE = 10;

  static prismaArrayBigIntWA(array) {
    return array.map((object) => {
      return this.prismaBigIntWA(object);
    });
  }

  static prismaBigIntWA(object) {
    if (Array.isArray(object)) {
      return this.prismaArrayBigIntWA(object);
    } else {
      const keys = Object.keys(object);
      const values = Object.values(object);
      const newObject = {};
      for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(values[i])) {
          newObject[keys[i]] = this.prismaArrayBigIntWA(values[i]);
        } else if (values[i] === null) {
          newObject[keys[i]] = values[i];
        } else if (typeof values[i] === 'object') {
          newObject[keys[i]] = this.prismaBigIntWA(values[i]);
        } else if (typeof values[i] === 'bigint') {
          newObject[keys[i]] = values[i].toString();
        } else {
          newObject[keys[i]] = values[i];
        }
      }
      return newObject;
    }
  }

  //   static getPaginationFilters(filter: FilterDto) {
  //     if (filter.paged && filter.paged.toString() === 'true') {
  //       return {
  //         skip:
  //           (filter.pageNumber
  //             ? Number(filter.pageNumber) - 1
  //             : this.DEFAULT_PAGE) *
  //           (filter.pageSize ? Number(filter.pageSize) : this.DEFAULT_PAGE_SIZE),
  //         take: filter.pageSize
  //           ? Number(filter.pageSize)
  //           : this.DEFAULT_PAGE_SIZE,
  //       };
  //     } else {
  //       return '';
  //     }
  //   }
}
