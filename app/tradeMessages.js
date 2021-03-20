

class TradeMessages {
    BuyOrderSuccessful(
        wealth,
        wealthPrice,
        amount
    ){
        return `${amount} ${wealth} alış emriniz gerçekleşti.`
    }

    SellOrderSuccessful(
        wealth,
        wealthPrice,
        amount
    ){
        return `${amount} ${wealth} satış emriniz gerçekleşti.`
    }

}