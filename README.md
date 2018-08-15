# TicketBus

### Installation using yarn:
```
yarn add ticketbus
```

### Usage:
```javascript
import TicketBus from 'ticketbus';

const bus = new TicketBus.Bus();
bus.addRelay('nameChanged', () => { console.log('Name changed, this fn will be called on bus.send()'); });
console.log(bus.getRelays());
bus.send();
```
