function formatId(prefix: any, id: any) {
    if (!id) {
      return '';
    }
    const paddedId = id?.toString()?.padStart(5, '0');    
    return `${prefix}${paddedId}`;
  }

export default formatId