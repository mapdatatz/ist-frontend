const formatMoney = (amount: any) => {
    if (amount === undefined) {
      return 0;
    }
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  
  export default formatMoney;