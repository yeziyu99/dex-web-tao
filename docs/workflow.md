## 开仓

- estExecPrice: openPrice \* (1 + spreadP / 100)

- slP:
- slDai: slP / 100 \* positionSizeDai
- sl:(选中 NONE 时，传值 0)

  - long: estExecPrice \* (1 + slDai / (positionSizeDai \* leverage))
  - short: estExecPrice \* (1 - slDai / (positionSizeDai \* leverage))

- tpP:
- tpDai: slP / 100 \* positionSizeDai
- tp:

  - long: estExecPrice \* (1 + tpDai / (positionSizeDai \* leverage));
  - short: estExecPrice \* (1 - tpDai / (positionSizeDai \* leverage));

- trade.index: 开仓时默认值为 0
- trade.initialPosSizeDai: 开仓时默认值为 0
