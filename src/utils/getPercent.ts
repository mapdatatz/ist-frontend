const getPercent = (actual: any, estimated: any) => {
    const amount = (actual / estimated) * 100;
    return amount.toFixed(0);
}

export default getPercent;