const getEfficiency = (actual: any, estimated: any) => {
    const amount = ((estimated / actual) * 100);
    return amount> 100 ? 100 :  amount.toFixed(0);
}

export default getEfficiency;