## APIs

### 开仓

- Contract: Trading
- FunctionName: openTrade
- ReadOrWrite: Write
- Arguments:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  | t | struct ITradingStorage.Trade | 交易对象 |
  | orderType | enum ITradingStorage.OpenLimitOrderType | 订单类型 |
  | SlippagePercent | uint8 | 滑点百分百, 取值范围:0 ~ 100, Precision: 10 |

### 平仓

- Contract: Trading
- FunctionName: closeTradeMarket
- ReadOrWrite: Write
- Arguments:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  |pairIndex|uint256|交易品种索引|
  | index | uint256 | 交易的索引|

### 获取持仓订单数量

- Contract: TradingStorageProxy
- FunctionName: openTradesCount
- ReadOrWrite: Read
- Arguments:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  |trader|address|交易者地址|
  |pairIndex|uint256|交易品种索引|
- Results: uint256

### 获取单个持仓订单

- Contract: TradingStorageProxy
- FunctionName: openTrades
- ReadOrWrite: Read
- Arguments:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  | trader|address|交易者地址|
  | pairIndex|uint256|交易品种索引|
  | index | uint256 | 交易的索引|
- Results:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  |trade|struct ITradingStorage.Trade|交易对象|

### 获取交易对数量

- Contract: PairsStorageProxy
- FunctionName: pairsCount
- ReadOrWrite: Read
- Arguments:
- Results: uint256

### 获取所有交易对

- Contract: PairsStorageProxy
- FunctionName: pairs
- ReadOrWrite: Read
- Arguments:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  |pairIndex|uint256|交易品种索引|
- Results:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  | |contract IPairsStorage.Pair|交易品种|

### 获取组

- Contract: PairsStorageProxy
- FunctionName: groups
- ReadOrWrite: Read
- Arguments:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  |groupIndex|uint256|组索引|
- Results:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  | |contract IPairsStorage.Group|组|

### 获取交易费用

- Contract: PairsStorageProxy
- FunctionName: fees
- ReadOrWrite: Read
- Arguments:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  |feeIndex|uint256|交易费用索引|
- Results:
  | Name | Type | Description |
  | --------------- | --------------------------------------- | ------------------------------------------- |
  | |contract IPairsStorage.Fee|交易费用|

## Structs

| Struct Name           | Attribute Name    | Type    | Description             |
| --------------------- | ----------------- | ------- | ----------------------- |
| ITradingStorage.Trade |                   | struct  |                         |
|                       | trader            | address | 交易者的钱包地址        |
|                       | pairIndex         | uint256 | 交易品种索引            |
|                       | index             | uint256 | 交易的索引              |
|                       | initialPosSizeDai | uint256 | 初始仓位, Precision: 18 |
|                       | positionSizeDai   | uint256 | 仓位大小, Precision: 18 |
|                       | openPrice         | uint256 | 开仓价格, Precision: 10 |
|                       | buy               | bool    | 是否是买入              |
|                       | leverage          | uint256 | 杠杆, Precision: 10     |
|                       | tp                | uint256 | 止盈价格, Precision: 10 |
|                       | sl                | uint256 | 止损价格, Precision: 10 |

| Struct Name        | Attribute Name | Type    | Description               |
| ------------------ | -------------- | ------- | ------------------------- |
| IPairsStorage.Pair |                | struct  |                           |
|                    | from           | string  | 第一个品种                |
|                    | to             | string  | 第二个品种                |
|                    | feed           | Feed    |                           |
|                    | spreadP        | uint256 | 点差百分百, Precision: 10 |
|                    | groupIndex     | uint256 | 组索引                    |
|                    | feeIndex       | uint256 | 交易费用索引              |

| Struct Name         | Attribute Name | Type    | Description   |
| ------------------- | -------------- | ------- | ------------- |
| IPairsStorage.Group |                | struct  |               |
|                     | name           | string  | 组名称        |
|                     | job            | bytes32 | Chainlink Job |
|                     | minLeverage    | uint256 | 最小杠杆      |
|                     | maxLeverage    | uint256 | 最大杠杆      |
|                     | maxCollateralP | uint256 |               |

| Struct Name       | Attribute Name    | Type    | Description                               |
| ----------------- | ----------------- | ------- | ----------------------------------------- |
| IPairsStorage.Fee |                   | struct  |                                           |
|                   | name              | string  | 费用名称                                  |
|                   | openFeeP          | bytes32 | 开仓费用比例                              |
|                   | closeFeeP         | uint256 | 平仓费用比例                              |
|                   | oracleFeeP        | uint256 |                                           |
|                   | nftLimitOrderFeeP | uint256 |                                           |
|                   | minLevPosDai      | uint256 | positionSizeDai x leverage, Precision: 18 |

## Enums

| Enum Name                          | Key      | Value | Description        |
| ---------------------------------- | -------- | ----- | ------------------ |
| ITradingStorage.OpenLimitOrderType |          |       |                    |
|                                    | LEGACY   | 0     | 市价订单（MARKET） |
|                                    | REVERSAL | 1     | 限价订单 (LIMIT)   |
|                                    | MOMENTUM | 2     | 止损订单 (STOP)    |
