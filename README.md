# TicketBus

### Installation using yarn:
```
yarn add ticketbus
```

### Usage:
```javascript
const Bus = require('ticketbus');

const b = new Bus();
b.addRelay('productNameChanged', () => { ...anything });
await b.send();
```
