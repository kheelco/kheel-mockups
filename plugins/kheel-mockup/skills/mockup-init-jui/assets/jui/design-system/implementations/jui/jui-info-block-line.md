---
component: jui-info-block-line
component-version: 1
target: jui
---

# jui-info-block-line → JUI

## Maps to

An info line of an **InfoBlock**: `InfoBlockCreator.line(line -> …)`, returning an `InfoLine<D>`. It is not a
component of its own.

```java
b.line(line -> { /* one item per jui-info-block-item */ });
```

## Properties

None.

## Slots

| Slot | Maps to |
| --- | --- |
| default | One item on the `InfoLine` per `jui-info-block-item`. |

## States

None.

## Notes

`InfoLine`'s source was not in the reference checkout; check its item methods.
